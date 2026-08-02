import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Check, Tag, ShoppingBag } from 'lucide-react';
import productImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';
import upiQr from '@assets/ChatGPT_Image_Jul_18,_2026,_03_00_35_PM_1784571576482.png';

export default function Cart() {
  const { 
    quantity, setQuantity, 
    isCartOpen, setIsCartOpen, 
    isCheckoutOpen, setIsCheckoutOpen,
    discountApplied, setDiscountApplied
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [txnId, setTxnId] = useState('');
  const [couponInput, setCouponInput] = useState('');

  const product = { name: "Araj Pure A2 Cow Ghee", price: 2299 };
  const subtotal = product.price * quantity;
  const discount = 250; // Raksha Bandhan offer — always applied
  const tax = Math.round((subtotal - discount) * 0.05);
  const final = subtotal - discount + tax;

  const handleApplyCoupon = () => {
    // Raksha Bandhan discount is auto-applied; coupon field kept for future use
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && !txnId) {
      alert("Please enter the UPI Transaction ID");
      return;
    }
    
    const myWhatsAppNumber = "918979221409";
    const waMessage = `NEW ORDER - ARAJ PURE\n\nProduct: ${product.name}\nQuantity: ${quantity}\nMRP Subtotal: ₹${subtotal}\n${discount > 0 ? `Discount: -₹${discount}\n` : ""}Tax (5%): +₹${tax}\nFinal Amount: ₹${final}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nPayment: ${paymentMethod === 'COD' ? "Cash on Delivery" : "UPI - TXN: " + txnId}`;
    
    window.open("https://wa.me/" + myWhatsAppNumber + "?text=" + encodeURIComponent(waMessage), '_blank');
    
    setIsCheckoutOpen(false);
    setQuantity(0);
    setDiscountApplied(false);
    setName('');
    setPhone('');
    setAddress('');
    setTxnId('');
  };

  return (
    <>
      {/* Side Cart */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-background z-[101] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-serif text-2xl text-foreground">Your Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {quantity === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground gap-4">
                    <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center opacity-50">
                      <ShoppingBag size={40} />
                    </div>
                    <p className="font-medium text-lg">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-primary hover:underline"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <img src={productImg} alt="Ghee" className="w-24 h-24 object-cover rounded-lg border border-border" />
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground leading-tight mb-2">{product.name}</h3>
                      <p className="text-primary font-semibold mb-3">₹{product.price.toLocaleString()}</p>
                      
                      <div className="flex items-center gap-4 bg-muted w-fit rounded-full px-2 py-1">
                        <button onClick={() => setQuantity(Math.max(0, quantity - 1))} className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center font-medium text-sm">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="w-6 h-6 flex items-center justify-center hover:bg-background rounded-full transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {quantity > 0 && (
                <div className="p-6 border-t border-border bg-card">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-xl font-semibold text-foreground">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-foreground text-background py-4 rounded-sm font-medium tracking-wide hover:bg-foreground/90 transition-colors"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[110] backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-background w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden my-8"
              >
                <div className="p-6 bg-foreground text-background flex justify-between items-center">
                  <h2 className="font-serif text-2xl">Complete Your Order</h2>
                  <button onClick={() => setIsCheckoutOpen(false)} className="hover:opacity-70 transition-opacity">
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  
                  {/* Left Column: Form & Payment */}
                  <form onSubmit={handlePlaceOrder} className="flex-1 space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg border-b border-border pb-2 mb-4">Delivery Details</h3>
                      <div className="space-y-4">
                        <input required type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-muted/50 border border-border rounded focus:outline-none focus:border-primary" />
                        <input required type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-4 py-3 bg-muted/50 border border-border rounded focus:outline-none focus:border-primary" />
                        <textarea required placeholder="Complete Delivery Address" value={address} onChange={e => setAddress(e.target.value)} rows={3} className="w-full px-4 py-3 bg-muted/50 border border-border rounded focus:outline-none focus:border-primary resize-none" />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg border-b border-border pb-2 mb-4">Payment Method</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:border-primary transition-colors">
                          <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-primary w-4 h-4" />
                          <span className="font-medium">Cash on Delivery (COD)</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border border-border rounded cursor-pointer hover:border-primary transition-colors">
                          <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="accent-primary w-4 h-4" />
                          <span className="font-medium">Pay via UPI (QR Code)</span>
                        </label>
                      </div>

                      {paymentMethod === 'UPI' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 bg-muted rounded-lg text-center border border-primary/20">
                          <p className="text-sm text-muted-foreground mb-3">Scan this QR code with any UPI app</p>
                          <img src={upiQr} alt="UPI QR Code" className="w-40 h-40 mx-auto rounded-lg mb-3 shadow-sm bg-white p-2" />
                          <p className="font-medium text-foreground mb-4 select-all">UPI ID: arajpureghee@okaxis</p>
                          <input required type="text" placeholder="Enter 12-digit UPI Transaction ID" value={txnId} onChange={e => setTxnId(e.target.value)} className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:border-primary" />
                        </motion.div>
                      )}
                    </div>

                    <button type="submit" className="w-full py-4 bg-primary text-primary-foreground font-semibold rounded shadow-lg hover:shadow-xl hover:bg-primary/90 transition-all active:scale-[0.98]">
                      Confirm & Place Order
                    </button>
                  </form>

                  {/* Right Column: Order Summary */}
                  <div className="md:w-[280px] space-y-6">
                    <div className="bg-muted p-5 rounded-lg border border-border/50">
                      <h3 className="font-semibold mb-4 border-b border-border/50 pb-2">Order Summary</h3>
                      <div className="flex justify-between text-sm mb-2 text-muted-foreground">
                        <span>{quantity}x {product.name}</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      
                      {/* Raksha Bandhan auto-discount */}
                      <div className="flex justify-between text-sm mb-2 font-medium items-center" style={{ color: '#b34a00' }}>
                        <span className="flex items-center gap-1"><Tag size={12} /> 🎉 Raksha Bandhan Offer</span>
                        <span>-₹250</span>
                      </div>
                      <div className="flex justify-between text-sm mb-4 text-muted-foreground">
                        <span>Tax (5%)</span>
                        <span>+₹{tax.toLocaleString()}</span>
                      </div>

                      <div className="border-t border-border/50 pt-3 flex justify-between font-bold text-lg text-foreground">
                        <span>Total</span>
                        <span>₹{final.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                      <Check size={14} className="text-primary" />
                      <span>Secure 256-bit encryption</span>
                    </div>
                  </div>

                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}