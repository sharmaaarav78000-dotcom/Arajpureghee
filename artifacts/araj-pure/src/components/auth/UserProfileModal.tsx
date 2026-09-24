import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { fetchUserOrders, updateUserAddressAndPhone, type OrderData } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { X, User, Package, MapPin, Phone, Mail, CheckCircle2, Clock, LogOut, ShoppingBag } from 'lucide-react';

export default function UserProfileModal() {
  const { user, profile, isProfileModalOpen, setIsProfileModalOpen, signOutUser, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    if (profile) {
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user && isProfileModalOpen) {
      fetchUserOrders(user.uid)
        .then((data) => setOrders(data))
        .catch((err) => console.error('Error fetching orders:', err));
    }
  }, [user, isProfileModalOpen]);

  if (!isProfileModalOpen || !user) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSaving(true);
      await updateUserAddressAndPhone(user.uid, {
        phone: phone.trim(),
        address: address.trim(),
      });
      await refreshProfile();
      toast({
        title: "Profile Updated",
        description: "Your default delivery address and phone number are saved in Firestore.",
      });
    } catch (err: any) {
      console.error('Error saving profile:', err);
      toast({
        title: "Update Error",
        description: "Could not save your preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = (name?: string | null) => {
    if (!name) return 'P';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[125] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
        onClick={() => setIsProfileModalOpen(false)}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 16 }}
          transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl rounded-[32px] overflow-hidden my-8 flex flex-col max-h-[90vh]"
          style={{
            background: 'rgba(18, 20, 20, 0.96)',
            backdropFilter: 'blur(35px) saturate(190%)',
            border: '1px solid rgba(214, 179, 106, 0.32)',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.95), 0 0 35px rgba(214, 179, 106, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Top Decorative Gold Bar */}
          <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, #BFA05A, #E8D39A, #BFA05A)' }} />

          {/* Header */}
          <div className="p-6 md:p-8 border-b border-[#D6B36A]/20 flex items-center justify-between bg-[#080909]/65">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Patron'}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#D6B36A] shadow-md"
                />
              ) : (
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-display text-lg font-bold border-2 border-[#D6B36A] bg-[#D6B36A]/15 text-[#D6B36A]"
                >
                  {getInitials(user.displayName)}
                </div>
              )}
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-xl text-[#F5F1E8]">
                    {user.displayName || 'Valued Patron'}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-sans font-semibold tracking-wider bg-[#D6B36A]/15 text-[#E8D39A] border border-[#D6B36A]/40 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-[#D6B36A]" /> Verified
                  </span>
                </div>
                <p className="font-sans text-xs text-[#F5F1E8]/65 flex items-center gap-1 mt-0.5">
                  <Mail size={12} className="text-[#D6B36A]" />
                  {user.email}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsProfileModalOpen(false)}
              className="p-2 rounded-full text-[#F5F1E8]/60 hover:text-[#D6B36A] hover:bg-[#D6B36A]/15 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#D6B36A]/18 bg-[#080909]/45 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-3.5 px-4 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'border-[#D6B36A] text-[#E8D39A]'
                  : 'border-transparent text-[#F5F1E8]/50 hover:text-white'
              }`}
            >
              <User size={14} /> Default Delivery Info
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 px-4 font-sans text-xs uppercase tracking-wider font-semibold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'orders'
                  ? 'border-[#D6B36A] text-[#E8D39A]'
                  : 'border-transparent text-[#F5F1E8]/50 hover:text-white'
              }`}
            >
              <Package size={14} /> Order History ({orders.length})
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1">
            {activeTab === 'profile' ? (
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div>
                  <h4 className="font-display font-medium text-lg text-[#F5F1E8] mb-1">
                    Delivery Preferences
                  </h4>
                  <p className="font-sans text-xs text-[#F5F1E8]/65">
                    Saved information is automatically pre-filled when you checkout for Araj Pure A2 Ghee jars.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                      Primary Mobile Number
                    </label>
                    <div className="relative">
                      <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#D6B36A]/70" />
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-sans text-[11px] uppercase tracking-wider mb-1.5 text-[#F5F1E8]/75">
                      Complete Shipping Address
                    </label>
                    <div className="relative">
                      <MapPin size={15} className="absolute left-3.5 top-3 text-[#D6B36A]/70" />
                      <textarea
                        rows={3}
                        placeholder="House / Apartment number, Street name, Landmark, City, State, PIN code"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm font-sans focus:outline-none transition-all resize-none text-[#F5F1E8] bg-[#080909]/65 border border-[#D6B36A]/28 focus:border-[#D6B36A]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-capsule-gold py-3 px-6 font-sans font-semibold text-xs tracking-[0.2em] uppercase cursor-pointer"
                  >
                    {isSaving ? 'Saving to Firestore...' : 'Save Default Address'}
                  </button>

                  <button
                    type="button"
                    onClick={signOutUser}
                    className="btn-capsule-glass py-2.5 px-4 text-xs font-sans font-medium text-rose-300 hover:text-rose-200 border-rose-500/30 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </form>
            ) : (
              <div>
                {orders.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-[#D6B36A]/10 border border-[#D6B36A]/28 flex items-center justify-center mb-4 text-[#D6B36A]">
                      <ShoppingBag size={28} />
                    </div>
                    <h4 className="font-display font-semibold text-lg text-[#F5F1E8] mb-1">
                      No Orders Placed Yet
                    </h4>
                    <p className="font-sans text-xs text-[#F5F1E8]/60 max-w-sm mb-6">
                      Your authentic Araj Pure Vedic Bilona A2 Ghee orders will appear here with live tracking.
                    </p>
                    <button
                      onClick={() => setIsProfileModalOpen(false)}
                      className="btn-capsule-gold py-2.5 px-6 text-xs font-sans font-semibold tracking-wider uppercase cursor-pointer"
                    >
                      Explore Fresh Batch
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div
                        key={o.id}
                        className="p-5 rounded-2xl border border-[#D6B36A]/22 bg-[#080909]/65 transition-all hover:border-[#D6B36A]/45"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D6B36A]/18 pb-3 mb-3">
                          <div>
                            <span className="font-mono text-xs text-[#D6B36A]">
                              ORDER #{o.id.slice(-6).toUpperCase()}
                            </span>
                            <span className="text-xs text-[#F5F1E8]/55 ml-2">
                              • {o.quantity}x {o.productName}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider bg-[#D6B36A]/15 text-[#E8D39A] border border-[#D6B36A]/35 flex items-center gap-1">
                            <Clock size={10} className="text-[#D6B36A]" /> {o.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-[#F5F1E8]/55">Delivery Address:</span>
                            <p className="text-[#F5F1E8] mt-0.5 line-clamp-2">{o.shippingAddress}</p>
                          </div>
                          <div className="sm:text-right">
                            <span className="text-[#F5F1E8]/55">Payment & Amount:</span>
                            <p className="text-[#E8D39A] font-bold text-sm mt-0.5">
                              ₹{o.totalAmount?.toLocaleString()}
                              <span className="text-xs font-normal text-[#F5F1E8]/65 ml-1">
                                ({o.paymentMethod})
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
