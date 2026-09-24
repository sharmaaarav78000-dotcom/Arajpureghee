import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { saveOrder, updateUserAddressAndPhone } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { X, Plus, Minus, Tag, ShoppingBag, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import productImg from '@assets/Gemini_Generated_Image_uxjmkduxjmkduxjm_1784571624266.png';
import upiQr from '@assets/ChatGPT_Image_Jul_18,_2026,_03_00_35_PM_1784571576482.png';

export default function Cart() {
  const { 
    quantity, setQuantity, 
    isCartOpen, setIsCartOpen, 
    isCheckoutOpen, setIsCheckoutOpen,
  } = useCart();

  const { user, profile, openAuthModal } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI'>('COD');
  const [txnId, setTxnId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Autofill if user profile exists
  useEffect(() => {
    if (user && isCheckoutOpen) {
      if (profile?.displayName || user.displayName) {
        setName((prev) => prev || profile?.displayName || user.displayName || '');
      }
      if (profile?.phone) {
        setPhone((prev) => prev || profile.phone || '');
      }
      if (profile?.address) {
        setAddress((prev) => prev || profile.address || '');
      }
    }
  }, [user, profile, isCheckoutOpen]);

  const product = { name: "Araj Pure A2 Cow Ghee", price: 2299 };
  const subtotal = product.price * quantity;
  const discount = 250; // Special Offer — ₹250 OFF
  const tax = Math.round((subtotal - discount) * 0.05);
  const final = subtotal - discount + tax;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && !txnId.trim()) {
      toast({
        title: "Transaction ID Required",
        description: "Please enter your UPI Transaction ID to confirm payment.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Save order to Firestore if user is logged in
      if (user) {
        await saveOrder({
          userId: user.uid,
          userEmail: user.email || '',
          userName: name.trim() || user.displayName || 'Patron',
          productName: product.name,
          quantity,
          subtotal,
          discount,
          tax,
          totalAmount: final,
          paymentMethod,
          txnId: paymentMethod === 'UPI' ? txnId.trim() : undefined,
          shippingAddress: address.trim(),
          phone: phone.trim(),
          status: 'Confirmed',
        });

        // Update profile phone & address in Firestore
        await updateUserAddressAndPhone(user.uid, {
          phone: phone.trim(),
          address: address.trim(),
        });

        toast({
          title: "Order Placed & Saved!",
          description: "Your order is recorded in your account. Opening WhatsApp for dispatch updates.",
        });
      }

      const myWhatsAppNumber = "918979221409";
      const waMessage = `NEW ORDER - ARAJ PURE\n\nProduct: ${product.name}\nQuantity: ${quantity}\nMRP Subtotal: ₹${subtotal}\n${discount > 0 ? `Special Offer Discount: -₹${discount}\n` : ""}Tax (5%): +₹${tax}\nFinal Amount: ₹${final}\n\nCustomer Details:\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\n\nPayment: ${paymentMethod === 'COD' ? "Cash on Delivery" : "UPI - TXN: " + txnId}`;
      
      window.open("https://wa.me/" + myWhatsAppNumber + "?text=" + encodeURIComponent(waMessage), '_blank');
      
      setIsCheckoutOpen(false);
      setQuantity(0);
      setName('');
      setPhone('');
      setAddress('');
      setTxnId('');
    } catch (err: any) {
      console.error('Error placing order:', err);
      toast({
        title: "Note on Order Storage",
        description: "Proceeding to WhatsApp confirmation...",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Side Cart Drawer: Obsidian Black (#080909) and Deep Charcoal (#121414) */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 z-[100] backdrop-blur-md"
            />
            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full max-w-md z-[101] flex flex-col"
              style={{
                background: 'rgba(18, 20, 20, 0.96)',
                backdropFilter: 'blur(32px) saturate(190%)',
                borderLeft: '1px solid rgba(214, 179, 106, 0.3)',
                boxShadow: '-20px 0 60px rgba(0, 0, 0, 0.9)',
              }}
            >
              <div className="p-6 border-b border-[#D6B36A]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#D6B36A]/15 border border-[#D6B36A]/40 text-[#D6B36A]">
                    <ShoppingBag size={16} />
                  </div>
                  <h2 className="font-display font-bold text-xl text-[#F5F1E8]">Your Cart</h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-[#D6B36A]/15 text-[#F5F1E8]/70 hover:text-[#D6B36A] transition-colors cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {quantity === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-[#F5F1E8]/50 gap-4">
                    <div className="w-24 h-24 rounded-full bg-[#121414] border border-[#D6B36A]/20 flex items-center justify-center text-[#D6B36A]/45">
                      <ShoppingBag size={38} />
                    </div>
                    <p className="font-display text-base text-[#F5F1E8]/70">Your cart is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="btn-capsule-glass px-6 py-2.5 text-xs uppercase tracking-wider font-semibold cursor-pointer"
                    >
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-[#121414]/75 border border-[#D6B36A]/24 flex gap-4 items-center">
                    <img src={productImg} alt="Ghee" className="w-20 h-20 object-contain rounded-xl bg-[#080909] p-1.5 border border-[#D6B36A]/25 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-semibold text-sm text-[#F5F1E8] truncate mb-1">{product.name}</h3>
                      <p className="text-sm font-bold text-[#E8D39A] mb-3">₹{product.price.toLocaleString()}</p>
                      
                      <div className="flex items-center gap-3 bg-[#080909] w-fit rounded-full px-2.5 py-1 border border-[#D6B36A]/28">
                        <button
                          onClick={() => setQuantity(Math.max(0, quantity - 1))}
                          className="w-5 h-5 flex items-center justify-center rounded-full text-[#F5F1E8]/70 hover:text-[#D6B36A] transition-colors cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-4 text-center font-bold text-xs text-[#F5F1E8]">{quantity}</span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full text-[#F5F1E8]/70 hover:text-[#D6B36A] transition-colors cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {quantity > 0 && (
                <div className="p-6 border-t border-[#D6B36A]/20 bg-[#080909]/85 backdrop-blur-lg">
                  <div className="flex items-center justify-between px-3.5 py-2 mb-4 rounded-xl bg-[#D6B36A]/12 border border-[#D6B36A]/30 text-xs">
                    <span className="flex items-center gap-1.5 font-medium text-[#E8D39A]">
                      <Sparkles size={13} className="text-[#D6B36A]" /> Special Offer Applied
                    </span>
                    <span className="font-bold text-[#D6B36A]">-₹250</span>
                  </div>
                  <div className="flex justify-between items-center mb-5">
                    <span className="font-sans text-xs uppercase tracking-wider text-[#F5F1E8]/65">Subtotal</span>
                    <div className="text-right">
                      <span className="font-display font-bold text-2xl text-[#E8D39A]">₹{(subtotal - discount).toLocaleString()}</span>
                      <span className="text-xs text-[#F5F1E8]/50 line-through ml-2">₹{subtotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="btn-capsule-gold w-full py-3.5 font-sans font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal with Luxury Glassmorphism */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 z-[110] backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="w-full max-w-2xl rounded-[32px] overflow-hidden my-8"
                style={{
                  background: 'rgba(18, 20, 20, 0.95)',
                  backdropFilter: 'blur(35px) saturate(190%)',
                  border: '1px solid rgba(214, 179, 106, 0.32)',
                  boxShadow: '0 30px 80px rgba(0,0,0,0.95), inset 0 1px 0 rgba(255,255,255,0.1)',
                }}
              >
                <div className="p-6 border-b border-[#D6B36A]/20 flex justify-between items-center bg-[#080909]/70">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#D6B36A]/15 border border-[#D6B36A]/45 text-[#D6B36A]">
                      ✦
                    </div>
                    <h2 className="font-display font-bold text-xl md:text-2xl text-[#F5F1E8]">Complete Your Order</h2>
                  </div>
                  <button onClick={() => setIsCheckoutOpen(false)} className="p-2 rounded-full hover:bg-[#D6B36A]/15 text-[#F5F1E8]/70 hover:text-[#D6B36A] transition-colors cursor-pointer">
                    <X size={22} />
                  </button>
                </div>

                <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
                  
                  {/* Left Column: Form & Payment */}
                  <form onSubmit={handlePlaceOrder} className="flex-1 space-y-6">
                    <div>
                      <div className="flex items-center justify-between border-b border-[#D6B36A]/18 pb-2 mb-4">
                        <h3 className="font-display font-semibold text-base text-[#F5F1E8]">Delivery Details</h3>
                        {user && (
                          <span className="font-sans text-[10px] uppercase tracking-wider font-semibold text-[#D6B36A] bg-[#D6B36A]/15 px-2.5 py-1 rounded-full border border-[#D6B36A]/40 flex items-center gap-1">
                            <UserCheck size={12} /> Connected
                          </span>
                        )}
                      </div>

                      {!user ? (
                        <div className="mb-4 p-3.5 rounded-2xl bg-[#D6B36A]/10 border border-[#D6B36A]/25 text-[#F5F1E8] text-xs flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Sparkles size={15} className="text-[#D6B36A] shrink-0" />
                            <span className="text-[#F5F1E8]/80 text-[11.5px]">Sign in with Google / Gmail for 1-click autofill & live tracking.</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => openAuthModal('login')}
                            className="btn-capsule-glass px-3 py-1 text-[10px] uppercase tracking-wider font-semibold shrink-0 cursor-pointer"
                          >
                            Sign In
                          </button>
                        </div>
                      ) : (
                        <div className="mb-4 p-2.5 rounded-xl bg-[#080909]/65 border border-[#D6B36A]/18 text-xs flex items-center justify-between">
                          <span className="text-[#F5F1E8]/75 text-[11px]">Ordering as: <strong className="text-[#E8D39A]">{user.displayName || user.email}</strong></span>
                        </div>
                      )}

                      <div className="space-y-3.5">
                        <input
                          required type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}
                          className="w-full px-4 py-3 bg-[#080909]/65 border border-[#D6B36A]/25 rounded-xl text-sm text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                        <input
                          required type="tel" placeholder="Mobile Number" value={phone} onChange={e => setPhone(e.target.value)}
                          className="w-full px-4 py-3 bg-[#080909]/65 border border-[#D6B36A]/25 rounded-xl text-sm text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                        />
                        <textarea
                          required placeholder="Complete Delivery Address" value={address} onChange={e => setAddress(e.target.value)} rows={3}
                          className="w-full px-4 py-3 bg-[#080909]/65 border border-[#D6B36A]/25 rounded-xl text-sm text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A] resize-none"
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-semibold text-base border-b border-[#D6B36A]/18 pb-2 mb-4 text-[#F5F1E8]">Payment Method</h3>
                      <div className="space-y-3">
                        <label className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'COD' ? 'bg-[#D6B36A]/15 border-[#D6B36A]' : 'bg-[#080909]/45 border-[#D6B36A]/20'}`}>
                          <input type="radio" name="payment" checked={paymentMethod === 'COD'} onChange={() => setPaymentMethod('COD')} className="accent-[#D6B36A] w-4 h-4" />
                          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F1E8]">Cash on Delivery (COD)</span>
                        </label>
                        <label className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-colors ${paymentMethod === 'UPI' ? 'bg-[#D6B36A]/15 border-[#D6B36A]' : 'bg-[#080909]/45 border-[#D6B36A]/20'}`}>
                          <input type="radio" name="payment" checked={paymentMethod === 'UPI'} onChange={() => setPaymentMethod('UPI')} className="accent-[#D6B36A] w-4 h-4" />
                          <span className="font-sans text-xs font-semibold uppercase tracking-wider text-[#F5F1E8]">Pay via UPI (QR Code)</span>
                        </label>
                      </div>

                      {paymentMethod === 'UPI' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-5 rounded-2xl text-center border border-[#D6B36A]/35 bg-[#080909]/85">
                          <p className="text-xs text-[#F5F1E8]/70 mb-3">Scan this QR code with any UPI app</p>
                          <img src={upiQr} alt="UPI QR Code" className="w-36 h-36 mx-auto rounded-xl mb-3 shadow-md bg-white p-2" />
                          <p className="font-mono text-xs text-[#E8D39A] mb-4 select-all font-semibold">UPI ID: arajpureghee@okaxis</p>
                          <input
                            required type="text" placeholder="Enter 12-digit UPI Transaction ID" value={txnId} onChange={e => setTxnId(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#121414] border border-[#D6B36A]/38 rounded-xl text-xs text-[#F5F1E8] focus:outline-none focus:border-[#D6B36A]"
                          />
                        </motion.div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-capsule-gold w-full py-4 font-sans font-semibold text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#080909] border-t-transparent rounded-full animate-spin" />
                          <span>Recording Order...</span>
                        </>
                      ) : (
                        <span>Confirm & Place Order</span>
                      )}
                    </button>
                  </form>

                  {/* Right Column: Order Summary */}
                  <div className="md:w-[280px] space-y-6">
                    <div className="p-5 rounded-2xl border border-[#D6B36A]/22 bg-[#080909]/75">
                      <h3 className="font-display font-semibold mb-4 border-b border-[#D6B36A]/18 pb-2 text-sm text-[#F5F1E8]">Order Summary</h3>
                      <div className="flex justify-between text-xs mb-2.5 text-[#F5F1E8]/70">
                        <span>{quantity}x {product.name}</span>
                        <span>₹{subtotal.toLocaleString()}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-xs mb-2.5 font-medium items-center text-[#E8D39A]">
                          <span className="flex items-center gap-1"><Tag size={12} className="text-[#D6B36A]" /> ✨ Special Offer (₹250 OFF)</span>
                          <span>-₹{discount}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-xs mb-4 text-[#F5F1E8]/70">
                        <span>Tax (5%)</span>
                        <span>+₹{tax.toLocaleString()}</span>
                      </div>

                      <div className="border-t border-[#D6B36A]/22 pt-3 flex justify-between font-bold text-lg text-[#F5F1E8]">
                        <span>Total</span>
                        <span className="text-[#E8D39A]">₹{final.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-wider text-[#F5F1E8]/55 justify-center">
                      <ShieldCheck size={14} className="text-[#D6B36A]" />
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
