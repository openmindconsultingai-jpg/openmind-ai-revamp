import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { CartDrawer } from '@/components/CartDrawer';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCTS_QUERY } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const Shop = () => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCTS_QUERY, { first: 20 });
        setProducts(data.data.products.edges);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Nie udało się załadować produktów');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Dodano do koszyka', {
      position: 'top-center',
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gradient">OpenMind AI Shop</h1>
          </div>
          <CartDrawer />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Nie znaleziono produktów</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Sklep jest obecnie pusty. Powiedz nam w czacie, jakie produkty chcesz dodać, a my je stworzymy dla Ciebie!
            </p>
            <Link to="/">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Wróć do strony głównej
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.node.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/shop/product/${product.node.handle}`}>
                  <CardHeader className="p-0">
                    {product.node.images?.edges?.[0]?.node ? (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.images.edges[0].node.altText || product.node.title}
                        className="w-full h-64 object-cover"
                      />
                    ) : (
                      <div className="w-full h-64 bg-secondary/20 flex items-center justify-center">
                        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                  </CardHeader>
                </Link>
                <CardContent className="p-4">
                  <Link to={`/shop/product/${product.node.handle}`}>
                    <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors">
                      {product.node.title}
                    </h3>
                  </Link>
                  {product.node.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {product.node.description}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="p-4 pt-0 flex items-center justify-between">
                  <span className="text-xl font-bold">
                    {product.node.priceRange.minVariantPrice.currencyCode}{' '}
                    {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                  </span>
                  <Button onClick={() => handleAddToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Dodaj
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Shop;
