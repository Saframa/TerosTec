import React, { useState } from 'react';
import { ShoppingCart, CheckCircle2, Loader2, PackageCheck, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const B2BCheckoutWidget: React.FC = () => {
  const { language } = useLanguage();
  const [quantity, setQuantity] = useState<number>(40);
  const [checkoutState, setCheckoutState] = useState<'idle' | 'processing' | 'success'>('idle');

  const unitPrice = 85;
  const discountRate = quantity >= 50 ? 0.15 : quantity >= 30 ? 0.1 : 0.05;
  const subtotal = quantity * unitPrice;
  const total = Math.round(subtotal * (1 - discountRate));

  const handleCheckout = () => {
    if (checkoutState !== 'idle') return;
    setCheckoutState('processing');
    setTimeout(() => {
      setCheckoutState('success');
      setTimeout(() => {
        setCheckoutState('idle');
      }, 3500);
    }, 1200);
  };

  return (
    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/70 border border-black/8 shadow-2xs space-y-4">
      {/* Encabezado del Producto B2B */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6E9EE] flex items-center justify-center text-[#0F172A]">
            <PackageCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#0F172A]">
              {language === 'es' ? 'Lote Mayorista B2B' : 'B2B Wholesale Batch'}
            </h5>
            <span className="text-[10px] text-[#64748B]">
              ${unitPrice} USD {language === 'es' ? '/ licencia' : '/ license'}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
          -{Math.round(discountRate * 100)}% {language === 'es' ? 'Volumen' : 'Volume'}
        </span>
      </div>

      {/* Selector de Cantidades */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#475569]">
          {language === 'es' ? 'Cantidad a ordenar:' : 'Quantity to order:'}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(10, q - 10))}
            disabled={quantity <= 10 || checkoutState !== 'idle'}
            className="w-7 h-7 rounded-lg bg-white border border-black/10 hover:border-black/25 flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors"
            aria-label="Disminuir cantidad"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="w-14 text-center font-mono font-bold text-xs text-[#0F172A] bg-white py-1 rounded border border-black/10">
            {quantity} {language === 'es' ? 'uds' : 'pcs'}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(200, q + 10))}
            disabled={quantity >= 200 || checkoutState !== 'idle'}
            className="w-7 h-7 rounded-lg bg-white border border-black/10 hover:border-black/25 flex items-center justify-center text-slate-700 disabled:opacity-40 transition-colors"
            aria-label="Aumentar cantidad"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Resumen de Monto */}
      <div className="p-2.5 rounded-xl bg-[#E6E9EE]/60 flex items-center justify-between text-xs font-mono">
        <span className="text-[#64748B]">
          {language === 'es' ? 'Total Calculado:' : 'Calculated Total:'}
        </span>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 line-through mr-1.5">${subtotal}</span>
          <span className="font-bold text-sm text-[#0F172A]">${total} USD</span>
        </div>
      </div>

      {/* Boton de Micro-animacion de Compra */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={checkoutState !== 'idle'}
        className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
          checkoutState === 'success'
            ? 'bg-emerald-600 text-white'
            : checkoutState === 'processing'
            ? 'bg-slate-700 text-white cursor-wait'
            : 'bg-[#0F172A] text-white hover:bg-black'
        }`}
      >
        {checkoutState === 'processing' ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>{language === 'es' ? 'Procesando pasarela...' : 'Processing gateway...'}</span>
          </>
        ) : checkoutState === 'success' ? (
          <>
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Orden #B2B-892 Emitida' : 'Order #B2B-892 Issued'}</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>{language === 'es' ? 'Simular Checkout B2B' : 'Simulate B2B Checkout'}</span>
          </>
        )}
      </button>
    </div>
  );
};
