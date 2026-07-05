import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Capacitor } from '@capacitor/core';

export const startScan = async (): Promise<string | null> => {
  if (Capacitor.getPlatform() === 'web') {
    // Fallback untuk Browser: Simulasi dengan Prompt
    const code = prompt('Browser Mode: Masukkan ID Deposit (Contoh: D-10293)');
    return code;
  }

  try {
    // 1. Pastikan modul Google Barcode terinstal di HP
    await BarcodeScanner.installGoogleBarcodeScannerModule();
    // ... rest of the code

    // 2. Cek & Minta Izin Kamera secara eksplisit
    const status = await BarcodeScanner.checkPermissions();
    if (status.camera !== 'granted') {
      const request = await BarcodeScanner.requestPermissions();
      if (request.camera !== 'granted') {
        alert('Izin kamera ditolak. Silakan aktifkan di pengaturan HP.');
        return null;
      }
    }

    // 3. Siapkan UI Transparan
    document.documentElement.classList.add('barcode-scanner-active');
    document.body.classList.add('barcode-scanner-active');

    return new Promise(async (resolve) => {
      // 4. Listener untuk menangkap hasil scan
      const listener = await BarcodeScanner.addListener('barcodesScanned', async (event) => {
        await listener.remove();
        await BarcodeScanner.stopScan();

        document.documentElement.classList.remove('barcode-scanner-active');
        document.body.classList.remove('barcode-scanner-active');

        if (event.barcodes.length > 0) {
          resolve(event.barcodes[0].displayValue);
        } else {
          resolve(null);
        }
      });

      // 5. Mulai Kamera
      try {
        await BarcodeScanner.startScan();
      } catch (e) {
        console.error('Gagal menjalankan kamera:', e);
        // Jika gagal, bersihkan UI
        document.documentElement.classList.remove('barcode-scanner-active');
        document.body.classList.remove('barcode-scanner-active');
        resolve(null);
      }
    });
  } catch (e) {
    console.error('Scan error:', e);
    return null;
  }
};

export const stopScan = async () => {
  try {
    await BarcodeScanner.stopScan();
  } finally {
    document.documentElement.classList.remove('barcode-scanner-active');
    document.body.classList.remove('barcode-scanner-active');
  }
};
