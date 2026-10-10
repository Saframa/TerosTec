import React, { useState } from 'react';
import {
  ArrowRightLeft,
  Store,
  Warehouse,
  Zap,
  CheckCircle2,
  RotateCcw,
  Boxes,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ProductItem {
  id: string;
  name: string;
  sku: string;
  stockWeb: number;
  stockERP: number;
}

export const OmnichannelSyncWidget: React.FC = () => {
  const { language } = useLanguage();

  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: 'prod-1',
      name: language === 'es' ? 'Servidor Edge TRX-40' : 'Edge Server TRX-40',
      sku: 'SKU: TRX-9402',
      stockWeb: 14,
      stockERP: 14,
    },
    {
      id: 'prod-2',
      name: language === 'es' ? 'Switch Gestionable 24P' : 'Managed Switch 24P',
      sku: 'SKU: SW-2400',
      stockWeb: 28,
      stockERP: 28,
    },
  ]);

  const [selectedProductId, setSelectedProductId] = useState<string>('prod-1');
  const [syncState, setSyncState] = useState<'idle' | 'transmitting' | 'reconciled'>('idle');
  const [lastTelemetry, setLastTelemetry] = useState<string | null>(null);

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const handleSimulateSale = () => {
    if (syncState !== 'idle') return;
    if (selectedProduct.stockWeb <= 0) return;

    // 1. Descuento inmediato en el canal web
    setProducts((prev) =>
      prev.map((p) =>
        p.id === selectedProductId
          ? { ...p, stockWeb: Math.max(0, p.stockWeb - 1) }
          : p
      )
    );

    setSyncState('transmitting');
    setLastTelemetry('POST /api/v1/stock/events -> webhook dispatching...');

    // 2. Transmisión del paquete de datos al ERP central (350ms)
    setTimeout(() => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProductId
            ? { ...p, stockERP: Math.max(0, p.stockERP - 1) }
            : p
        )
      );
      setSyncState('reconciled');
      setLastTelemetry('200 OK | inventory.reconciled | latency: 18ms');

      // 3. Volver al estado activo después de mostrar la confirmación
      setTimeout(() => {
        setSyncState('idle');
      }, 2500);
    }, 450);
  };

  const handleResetStock = () => {
    setProducts([
      {
        id: 'prod-1',
        name: language === 'es' ? 'Servidor Edge TRX-40' : 'Edge Server TRX-40',
        sku: 'SKU: TRX-9402',
        stockWeb: 14,
        stockERP: 14,
      },
      {
        id: 'prod-2',
        name: language === 'es' ? 'Switch Gestionable 24P' : 'Managed Switch 24P',
        sku: 'SKU: SW-2400',
        stockWeb: 28,
        stockERP: 28,
      },
    ]);
    setSyncState('idle');
    setLastTelemetry(null);
  };

  return (
    <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-white/75 border border-black/8 shadow-2xs space-y-4">
      {/* Encabezado del Monitor de Sincronización */}
      <div className="flex items-center justify-between pb-3 border-b border-black/5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E6E9EE] flex items-center justify-center text-[#0F172A]">
            <ArrowRightLeft className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-[#0F172A]">
              {language === 'es'
                ? 'Monitor de Sincronización Omnicanal'
                : 'Omnichannel Synchronization Monitor'}
            </h5>
            <span className="text-[10px] text-[#64748B]">
              {language === 'es'
                ? 'Canal Web vs. Depósito Físico'
                : 'Web Channel vs. Central Warehouse'}
            </span>
          </div>
        </div>

        {/* Badge de Estado en Tiempo Real */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-black/5 text-[10px] font-mono font-medium">
          <span
            className={`w-2 h-2 rounded-full ${
              syncState === 'transmitting'
                ? 'bg-amber-500 animate-ping'
                : syncState === 'reconciled'
                ? 'bg-emerald-500'
                : 'bg-emerald-500'
            }`}
          />
          <span className="text-slate-700">
            {syncState === 'transmitting'
              ? language === 'es'
                ? 'Sincronizando...'
                : 'Syncing...'
              : syncState === 'reconciled'
              ? language === 'es'
                ? 'Conciliado (200 OK)'
                : 'Reconciled (200 OK)'
              : language === 'es'
              ? 'En línea · 18ms'
              : 'Online · 18ms'}
          </span>
        </div>
      </div>

      {/* Topología Visual de Canales: Web -> Pipeline -> Depósito */}
      <div className="grid grid-cols-11 items-center gap-1 py-2 px-3 rounded-xl bg-slate-50/80 border border-black/5">
        {/* Nodo 1: Tienda Web */}
        <div className="col-span-5 flex items-center gap-2.5 p-2 rounded-lg bg-white border border-black/5 shadow-2xs">
          <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <Store className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-[#0F172A] block truncate">
              {language === 'es' ? 'Tienda Web B2B' : 'B2B Web Store'}
            </span>
            <span className="text-[9px] font-mono text-[#64748B] block">
              Frontend API
            </span>
          </div>
        </div>

        {/* Conector Central: Cable con indicador de pulso */}
        <div className="col-span-1 flex flex-col items-center justify-center">
          <div className="w-full h-[2px] bg-slate-200 relative flex items-center justify-center">
            {syncState === 'transmitting' ? (
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            ) : (
              <Zap className="w-3 h-3 text-[#64748B]" />
            )}
          </div>
        </div>

        {/* Nodo 2: Depósito Central / ERP */}
        <div className="col-span-5 flex items-center gap-2.5 p-2 rounded-lg bg-white border border-black/5 shadow-2xs">
          <div className="w-7 h-7 rounded-md bg-slate-100 text-[#0F172A] flex items-center justify-center shrink-0">
            <Warehouse className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <span className="text-[11px] font-bold text-[#0F172A] block truncate">
              {language === 'es' ? 'Depósito Central' : 'Central Warehouse'}
            </span>
            <span className="text-[9px] font-mono text-[#64748B] block">
              ERP / Inventario
            </span>
          </div>
        </div>
      </div>

      {/* Lista de Productos con Stock Dual */}
      <div className="space-y-2">
        {products.map((product) => {
          const isSelected = product.id === selectedProductId;
          return (
            <div
              key={product.id}
              onClick={() => setSelectedProductId(product.id)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-white border-black/20 shadow-xs ring-1 ring-black/5'
                  : 'bg-white/50 border-black/5 hover:bg-white hover:border-black/10'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-slate-100 text-[#64748B]'
                  }`}
                >
                  <Boxes className="w-3 h-3" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-semibold text-[#0F172A] block truncate">
                    {product.name}
                  </span>
                  <span className="text-[9px] font-mono text-[#64748B]">
                    {product.sku}
                  </span>
                </div>
              </div>

              {/* Comparador de Stock en Ambos Canales */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">
                    Web
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      syncState === 'transmitting' && isSelected
                        ? 'text-amber-600'
                        : 'text-[#0F172A]'
                    }`}
                  >
                    {product.stockWeb} uds
                  </span>
                </div>

                <div className="text-slate-300">|</div>

                <div className="text-right">
                  <span className="text-[9px] uppercase tracking-wider text-[#64748B] block">
                    ERP
                  </span>
                  <span
                    className={`font-mono text-xs font-bold ${
                      syncState === 'reconciled' && isSelected
                        ? 'text-emerald-600'
                        : 'text-[#0F172A]'
                    }`}
                  >
                    {product.stockERP} uds
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Telemetría de la API en Vivo */}
      {lastTelemetry && (
        <div className="p-2 rounded-lg bg-[#0F172A] text-slate-200 text-[10px] font-mono flex items-center justify-between">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="truncate">{lastTelemetry}</span>
          </div>
          <span className="text-slate-400 text-[9px] shrink-0 ml-2">REST API</span>
        </div>
      )}

      {/* Acciones Interactivas */}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          onClick={handleSimulateSale}
          disabled={syncState !== 'idle' || selectedProduct.stockWeb <= 0}
          className="apple-button flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-[#0F172A] text-white hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center justify-center gap-2"
        >
          {syncState === 'transmitting' ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              <span>
                {language === 'es'
                  ? 'Conciliando Stock...'
                  : 'Reconciling Stock...'}
              </span>
            </>
          ) : syncState === 'reconciled' ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {language === 'es'
                  ? 'Sincronizado con Éxito'
                  : 'Successfully Synced'}
              </span>
            </>
          ) : (
            <>
              <Store className="w-3.5 h-3.5 opacity-90" />
              <span>
                {language === 'es'
                  ? `Simular Venta en Tienda (-1 ud)`
                  : `Simulate Store Sale (-1 unit)`}
              </span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleResetStock}
          title={language === 'es' ? 'Restablecer inventario' : 'Reset inventory'}
          className="p-2.5 rounded-xl bg-white border border-black/10 hover:border-black/20 text-[#64748B] hover:text-[#0F172A] transition-colors"
          aria-label="Restablecer inventario"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
