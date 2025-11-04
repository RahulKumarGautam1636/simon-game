import React, { useState, useRef } from 'react';
import { Search, User, ChevronUp, ChevronDown, Menu, X, ShoppingCart, Phone, Mail, MapPin, Minus, Plus, Trash2, Edit, ChevronLeft, ChevronRight } from 'lucide-react';


export default function CheckoutPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTable, setSelectedTable] = useState('');
  const [waiterSearch, setWaiterSearch] = useState('');
  const [memberName, setMemberName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showTableDropdown, setShowTableDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderItems, setOrderItems] = useState([
    { id: 1, name: 'MINERAL WATER', rate: 20, qty: 1, note: '', showNote: false, category: 'Beverages' }
  ]);

  const categoryScrollRefDesktop = useRef(null);
  const categoryScrollRefMobile = useRef(null);

  const tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8'];
  const categories = ['All', 'Beverages', 'Hot Drinks', 'Snacks', 'Main Course'];
  
  const menuItems = [
    { id: 1, name: 'MINERAL WATER', rate: 20, category: 'Beverages' },
    { id: 2, name: 'COFFEE', rate: 50, category: 'Hot Drinks' },
    { id: 3, name: 'TEA', rate: 30, category: 'Hot Drinks' },
    { id: 4, name: 'SANDWICH', rate: 80, category: 'Snacks' },
    { id: 5, name: 'BURGER', rate: 120, category: 'Main Course' },
    { id: 6, name: 'PIZZA', rate: 250, category: 'Main Course' },
    { id: 7, name: 'PASTA', rate: 180, category: 'Main Course' },
    { id: 8, name: 'FRENCH FRIES', rate: 90, category: 'Snacks' },
    { id: 9, name: 'COLD DRINK', rate: 40, category: 'Beverages' },
    { id: 10, name: 'JUICE', rate: 60, category: 'Beverages' }
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const scrollCategories = (direction, isMobile = false) => {
    const scrollContainer = isMobile ? categoryScrollRefMobile.current : categoryScrollRefDesktop.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth'
      });
    }
  };

  const addToOrder = (item) => {
    const existingItem = orderItems.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      updateQuantity(item.id, existingItem.qty + 1);
    } else {
      setOrderItems([...orderItems, { ...item, qty: 1, note: '', showNote: false }]);
    }
  };

  const updateQuantity = (id, newQty) => {
    if (newQty < 1) {
      removeItem(id);
      return;
    }
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, qty: newQty } : item
    ));
  };

  const updateNote = (id, note) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, note } : item
    ));
  };

  const toggleNoteVisibility = (id) => {
    setOrderItems(orderItems.map(item => 
      item.id === id ? { ...item, showNote: !item.showNote } : item
    ));
  };

  const removeItem = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const removeFromSearch = (id) => {
    setOrderItems(orderItems.filter(item => item.id !== id));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + (item.rate * item.qty), 0);
  };

  const getItemInOrder = (itemId) => {
    return orderItems.find(item => item.id === itemId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-orange-50/20 to-amber-50/20 text-lg">
      {/* Compact Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-3 lg:px-4">
          <div className="flex items-center justify-between py-2 gap-3">
            {/* Compact Logo */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-orange-500 to-orange-600 !rounded-lg flex items-center justify-center shadow-md hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">🍴</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-sm text-gray-800">FoodHub</h1>
              </div>
            </div>

            {/* Compact Search */}
            <div className="hidden md:flex flex-1 max-w-lg mx-3 relative">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchResults(e.target.value.length > 0);
                  }}
                  placeholder="Search menu..."
                  className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 !rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all shadow-sm"
                />
                <Search className="w-4 h-4 text-orange-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              
              {/* Compact Search Results */}
              {showSearchResults && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white !rounded-xl shadow-xl border border-gray-200 max-h-[480px] overflow-hidden z-50 animate-fadeIn">
                  {/* Compact Header */}
                  <div className="sticky top-0 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100 px-3 py-2.5 z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gradient-to-br from-orange-500 to-orange-600 !rounded-lg flex items-center justify-center">
                          <Search className="w-3.5 h-3.5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-gray-800">Search Results</h3>
                          <p className="text-[10px] text-gray-600">{filteredItems.length} items</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowSearchResults(false)}
                        className="p-1 hover:bg-white !rounded-lg transition-all"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>

                    {/* Compact Categories */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => scrollCategories('left', false)}
                        className="w-6 h-6 bg-white hover:bg-orange-50 !rounded-lg flex items-center justify-center border border-orange-200"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 text-orange-600" />
                      </button>

                      <div className="flex-1 overflow-hidden">
                        <div 
                          ref={categoryScrollRefDesktop}
                          className="flex gap-1.5 overflow-x-auto scrollbar-hide"
                        >
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`flex-shrink-0 px-3 py-1.5 text-xs font-bold !rounded-lg transition-all ${
                                selectedCategory === category
                                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                                  : 'bg-white text-gray-700 border border-gray-300 hover:border-orange-300'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => scrollCategories('right', false)}
                        className="w-6 h-6 bg-white hover:bg-orange-50 !rounded-lg flex items-center justify-center border border-orange-200"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-orange-600" />
                      </button>
                    </div>
                  </div>

                  {/* Compact Results */}
                  <div className="overflow-y-auto max-h-[360px] custom-scrollbar">
                    {filteredItems.length > 0 ? (
                      <div className="p-2 space-y-2">
                        {filteredItems.map((item) => {
                          const itemInOrder = getItemInOrder(item.id);
                          return (
                            <div
                              key={item.id}
                              className="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 !rounded-lg p-2.5 transition-all shadow-sm"
                            >
                              <div className="flex items-center gap-2.5">
                                <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 !rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-300">
                                  <span className="text-xl">🍽️</span>
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-1.5 mb-1">
                                    <h4 className="font-bold text-xs text-gray-800 line-clamp-1">{item.name}</h4>
                                    <span className="flex-shrink-0 px-1.5 py-0.5 bg-orange-100 text-orange-700 text-[9px] font-bold rounded">{item.category}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-sm font-bold text-orange-600">₹{item.rate}</span>
                                    <span className="text-[10px] text-gray-400 line-through">₹{item.rate + 10}</span>
                                    <span className="px-1 py-0.5 bg-green-100 text-green-700 text-[8px] font-bold rounded">Save ₹10</span>
                                  </div>

                                  <p className="text-[10px] text-gray-500">
                                    <span className="inline-flex items-center gap-0.5">
                                      <span className="w-1 h-1 bg-green-500 !rounded-full"></span>
                                      Available
                                    </span>
                                  </p>
                                </div>

                                <div className="flex-shrink-0">
                                  {itemInOrder ? (
                                    <div className="flex items-center gap-1 bg-white !rounded-lg p-0.5 border-2 border-orange-300">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          if (itemInOrder.qty === 1) removeFromSearch(item.id);
                                          else updateQuantity(item.id, itemInOrder.qty - 1);
                                        }}
                                        className="w-6 h-6 rounded bg-red-50 hover:bg-red-100 flex items-center justify-center text-red-600"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className="font-bold text-xs px-1">{itemInOrder.qty}</span>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          updateQuantity(item.id, itemInOrder.qty + 1);
                                        }}
                                        className="w-6 h-6 rounded bg-green-50 hover:bg-green-100 flex items-center justify-center text-green-600"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        addToOrder(item);
                                      }}
                                      className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold !rounded-lg shadow-md hover:shadow-lg"
                                    >
                                      Add
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-600 font-semibold text-sm">No items found</p>
                      </div>
                    )}
                  </div>

                  {/* Compact Footer */}
                  <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-3 py-2">
                    <p className="text-[10px] text-center text-gray-600">
                      💡 Use +/- to adjust quantities
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Compact User Button */}
            <div className="hidden md:flex items-center">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs !rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold shadow-md">
                <User className="w-3 h-3" />
                <span>AKAKSH</span>
              </button>
            </div>

            {/* Mobile Menu */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-1.5 !rounded-lg hover:bg-orange-50"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-2 relative">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                placeholder="Search..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-gray-300 !rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500/50 shadow-sm"
              />
              <Search className="w-4 h-4 text-orange-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            
            {/* Mobile Search Results */}
            {showSearchResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white !rounded-xl shadow-xl border border-gray-200 max-h-[400px] overflow-hidden z-50">
                <div className="sticky top-0 bg-orange-50 border-b border-orange-100 px-3 py-2 z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 bg-orange-500 !rounded-lg flex items-center justify-center">
                        <Search className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-xs font-bold">{filteredItems.length} items</span>
                    </div>
                    <button onClick={() => setShowSearchResults(false)} className="p-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="overflow-x-auto scrollbar-hide">
                    <div ref={categoryScrollRefMobile} className="flex gap-1.5">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`flex-shrink-0 px-2.5 py-1 text-xs font-bold !rounded-lg ${
                            selectedCategory === category
                              ? 'bg-orange-500 text-white'
                              : 'bg-white text-gray-700 border border-gray-300'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="overflow-y-auto max-h-[300px] p-2 space-y-1.5">
                  {filteredItems.map((item) => {
                    const itemInOrder = getItemInOrder(item.id);
                    return (
                      <div key={item.id} className="bg-white border border-gray-200 !rounded-lg p-2 flex items-center gap-2">
                        <div className="w-12 h-12 bg-gray-100 !rounded-lg flex items-center justify-center">
                          <span className="text-lg">🍽️</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-xs text-gray-800">{item.name}</h4>
                          <p className="text-xs font-bold text-orange-600">₹{item.rate}</p>
                        </div>
                        <div>
                          {itemInOrder ? (
                            <div className="flex items-center gap-1 bg-gray-50 rounded p-0.5 border border-orange-300">
                              <button
                                onClick={() => itemInOrder.qty === 1 ? removeFromSearch(item.id) : updateQuantity(item.id, itemInOrder.qty - 1)}
                                className="w-5 h-5 rounded bg-red-50 flex items-center justify-center"
                              >
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="font-bold text-xs px-1">{itemInOrder.qty}</span>
                              <button
                                onClick={() => updateQuantity(item.id, itemInOrder.qty + 1)}
                                className="w-5 h-5 rounded bg-green-50 flex items-center justify-center"
                              >
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToOrder(item)}
                              className="px-2.5 py-1 bg-orange-500 text-white text-xs font-bold !rounded-lg"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {showMobileMenu && (
            <div className="md:hidden pb-2">
              <button className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs !rounded-lg bg-orange-500 text-white font-bold">
                <User className="w-3 h-3" />
                <span>AKAKSH</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #f97316, #ea580c); border-radius: 10px; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        @keyframes slideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 1000px; } }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>

      {/* Compact Main Content */}
      <main className="flex-1  px-3 lg:px-4 py-3 mx-auto w-full max-w-[125rem] item-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {/* Compact Order Details */}
          <div>
            <button
              onClick={() => setShowOrderDetails(!showOrderDetails)}
              className="lg:hidden w-full flex items-center justify-between bg-gradient-to-r from-orange-500 to-orange-600 text-white !rounded-xl p-3 mb-3 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                <span className="font-bold text-sm">Order Details</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${showOrderDetails ? 'rotate-180' : ''}`} />
            </button>

            <div className={`${showOrderDetails ? 'block' : 'hidden'} lg:block bg-white !rounded-xl shadow-lg p-4 border border-gray-200`}>
              <div className="hidden lg:flex items-center gap-2 mb-3 pb-3 border-b border-orange-100">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 !rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-bold text-gray-800">Order Details</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Table</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowTableDropdown(!showTableDropdown)}
                      className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 !rounded-lg text-left hover:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all shadow-sm font-semibold flex items-center justify-between"
                    >
                      <span className={selectedTable ? 'text-gray-900' : 'text-gray-500'}>{selectedTable || 'Choose table'}</span>
                      <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform ${showTableDropdown ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showTableDropdown && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 !rounded-lg shadow-xl max-h-48 overflow-y-auto">
                        <div className="p-2 grid grid-cols-2 gap-1.5">
                          {tables.map((table) => (
                            <button
                              key={table}
                              onClick={() => {
                                setSelectedTable(table);
                                setShowTableDropdown(false);
                              }}
                              className="px-3 py-2 text-sm text-left !rounded-lg hover:bg-orange-50 hover:text-orange-700 font-bold"
                            >
                              {table}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Waiter</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={waiterSearch}
                      onChange={(e) => setWaiterSearch(e.target.value)}
                      placeholder="Search..."
                      className="flex-1 px-3 py-2 text-sm bg-gray-50 border border-gray-300 !rounded-lg focus:ring-2 focus:ring-orange-500/30 shadow-sm"
                    />
                    <button className="px-4 py-2 text-sm bg-gray-800 text-white font-bold !rounded-lg shadow-md hover:bg-gray-900">
                      Search
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Customer Name</label>
                  <input
                    type="text"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Enter name"
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 !rounded-lg focus:ring-2 focus:ring-orange-500/30 shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter phone"
                    className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 !rounded-lg focus:ring-2 focus:ring-orange-500/30 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Compact Order Summary */}
          <div>
            <div className="bg-white !rounded-xl shadow-lg p-4 border border-gray-200 lg:top-20">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-orange-100">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 !rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-gray-800">Your Order</h4>
                  <p className="text-xs text-gray-600">{orderItems.length} items</p>
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 pb-2 border-b border-gray-300 text-[10px] font-bold text-gray-700 mb-3">
                <div className="col-span-5">ITEM</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-center">RATE</div>
                <div className="col-span-3 text-right">TOTAL</div>
              </div>

              <div className="max-h-80 overflow-y-auto custom-scrollbar mb-4">
                {orderItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 font-semibold text-sm">No items added</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {orderItems.map((item) => (
                      <div key={item.id} className="bg-gray-50 border border-gray-200 !rounded-lg p-2.5">
                        <div className="grid grid-cols-12 gap-2 items-center text-sm mb-2">
                          <div className="col-span-5 flex items-start gap-1">
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-0.5 rounded">
                              <Trash2 className="w-3 h-3" />
                            </button>
                            <div className="flex-1">
                              <span className="font-bold text-xs text-gray-800 block">{item.name}</span>
                              <button
                                onClick={() => toggleNoteVisibility(item.id)}
                                className="flex items-center gap-0.5 text-blue-600 mt-0.5"
                              >
                                <Edit className="w-2.5 h-2.5" />
                                <span className="text-[10px] font-semibold">{item.showNote ? 'Hide' : 'Note'}</span>
                              </button>
                            </div>
                          </div>
                          <div className="col-span-2 flex items-center justify-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.qty - 1)}
                              className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center hover:bg-red-50"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="font-bold text-xs">{item.qty}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.qty + 1)}
                              className="w-5 h-5 rounded border border-gray-400 flex items-center justify-center hover:bg-green-50"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                          <div className="col-span-2 text-center font-bold text-xs">₹{item.rate}</div>
                          <div className="col-span-3 flex items-center justify-end gap-1">
                            <span className="font-bold text-orange-600 text-xs">₹{item.rate * item.qty}</span>
                            <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-50 p-0.5 rounded">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        
                        {item.showNote && (
                          <div className="mt-2 bg-blue-50 !rounded-lg p-2 border border-blue-200">
                            <div className="flex gap-1.5">
                              <input
                                type="text"
                                value={item.note}
                                onChange={(e) => updateNote(item.id, e.target.value)}
                                placeholder="Note..."
                                className="flex-1 px-2 py-1 text-xs bg-white border border-gray-300 rounded focus:ring-2 focus:ring-blue-500/30"
                              />
                              <button className="px-3 py-1 bg-gray-700 text-white text-xs font-bold rounded">Save</button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="bg-cyan-50 !rounded-lg p-3 border border-cyan-200 mb-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-700">TOTAL</span>
                  <span className="text-xl font-bold text-orange-600">₹{calculateTotal()}</span>
                </div>
              </div>

              <button 
                disabled={orderItems.length === 0}
                className="w-full py-2.5 text-sm bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold !rounded-lg shadow-lg"
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Compact Footer */}
      <footer className="bg-gray-900 text-white mt-6">
        <div className="container mx-auto px-3 lg:px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <div className="w-8 h-8 bg-orange-500 !rounded-lg flex items-center justify-center">
                  <span className="text-white text-base">🍴</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">FoodHub</h3>
                  <p className="text-orange-400 text-xs">Restaurant</p>
                </div>
              </div>
              <p className="text-gray-400 text-xs">Quality food since 2020</p>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-bold text-xs mb-2 text-orange-400">Contact</h4>
              <div className="space-y-1 text-gray-300 text-xs">
                <p className="flex items-center justify-center md:justify-start gap-1.5">
                  <Phone className="w-3 h-3" />
                  +91 98765 43210
                </p>
                <p className="flex items-center justify-center md:justify-start gap-1.5">
                  <Mail className="w-3 h-3" />
                  contact@foodhub.com
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h4 className="font-bold text-xs mb-2 text-orange-400">Hours</h4>
              <div className="text-gray-300 text-xs space-y-0.5">
                <p>Mon-Fri: 9 AM - 11 PM</p>
                <p>Sat-Sun: 10 AM - 12 AM</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-4 pt-3 text-center">
            <p className="text-gray-400 text-xs">© 2025 FoodHub</p>
          </div>
        </div>

        {/* <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 w-10 h-10 bg-orange-500 hover:bg-orange-600 text-white !rounded-full shadow-xl flex items-center justify-center z-50"
        >
          <ChevronUp className="w-5 h-5" />
        </button> */}
      </footer>
    </div>
  );
}
