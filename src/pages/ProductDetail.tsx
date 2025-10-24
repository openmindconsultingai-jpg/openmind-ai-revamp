import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CartDrawer } from '@/components/CartDrawer';
import { ShopifyProduct, storefrontApiRequest, STOREFRONT_PRODUCT_BY_HANDLE_QUERY } from '@/lib/shopify';
import { useCartStore } from '@/stores/cartStore';
import { ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<ShopifyProduct['node'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      
      try {
        const data = await storefrontApiRequest(STOREFRONT_PRODUCT_BY_HANDLE_QUERY, { handle });
        setProduct(data.data.product);
        setSelectedVariant(data.data.product?.variants?.edges?.[0]?.node);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Nie udało się załadować produktu');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success('Dodano do koszyka', {
      position: 'top-center',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produkt nie znaleziony</h2>
          <Link to="/shop">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Wróć do sklepu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/shop">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {product.images?.edges?.[0]?.node ? (
              <img
                src={product.images.edges[0].node.url}
                alt={product.images.edges[0].node.altText || product.title}
                className="w-full rounded-lg"
              />
            ) : (
              <div className="w-full aspect-square bg-secondary/20 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-24 w-24 text-muted-foreground" />
              </div>
            )}
            {product.images?.edges && product.images.edges.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.edges.slice(1, 5).map((image, idx) => (
                  <img
                    key={idx}
                    src={image.node.url}
                    alt={image.node.altText || `${product.title} ${idx + 2}`}
                    className="w-full aspect-square object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-3xl font-bold text-primary">
                {selectedVariant?.price.currencyCode}{' '}
                {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
              </p>
            </div>

            {product.description && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Opis</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {product.options && product.options.length > 0 && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <h3 className="font-medium mb-2">{option.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map((value) => (
                        <Button
                          key={value}
                          variant={
                            selectedVariant?.selectedOptions?.some(
                              (o: any) => o.name === option.name && o.value === value
                            )
                              ? 'default'
                              : 'outline'
                          }
                          onClick={() => {
                            const variant = product.variants.edges.find((v) =>
                              v.node.selectedOptions.some(
                                (o) => o.name === option.name && o.value === value
                              )
                            );
                            if (variant) setSelectedVariant(variant.node);
                          }}
                        >
                          {value}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              onClick={handleAddToCart}
              disabled={!selectedVariant?.availableForSale}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {selectedVariant?.availableForSale ? 'Dodaj do koszyka' : 'Niedostępny'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
