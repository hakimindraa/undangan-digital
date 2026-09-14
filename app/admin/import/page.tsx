"use client";

import { useState } from "react";
import { UploadCloud, FileDown } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{success: boolean; count: number; failed: string[]} | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setResult(null);

      // Read for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target?.result;
        if (!data) return;

        if (selectedFile.name.endsWith(".csv")) {
          const text = data as string;
          const parsed = Papa.parse(text, { header: true, skipEmptyLines: true });
          setPreview(parsed.data.slice(0, 5)); // show max 5
        } else if (selectedFile.name.endsWith(".xlsx")) {
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          setPreview(json.slice(0, 5));
        }
      };
      
      if (selectedFile.name.endsWith(".csv")) {
        reader.readAsText(selectedFile);
      } else {
        reader.readAsBinaryString(selectedFile);
      }
    }
  };

  const handleImport = async () => {
    if (!file) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/guests/import", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setResult({
          success: true,
          count: data.importedCount,
          failed: data.failedGuests,
        });
        setFile(null);
        setPreview([]);
      } else {
        alert(data.error || "Gagal mengimport");
      }
    } catch (error) {
      alert("Terjadi kesalahan sistem");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const csvContent = "data:text/csv;charset=utf-8,name,phone\nBudi Santoso,081234567890\nSiti Aminah,089876543210";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "nikahikek-template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-primary">Import Data Tamu</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Upload CSV / Excel</h2>
            <p className="text-gray-500 text-sm mt-1">Format harus memiliki kolom 'name' dan 'phone'</p>
          </div>
          <button 
            onClick={downloadTemplate}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            <FileDown size={16} />
            Template CSV
          </button>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center justify-center bg-gray-50 mb-6">
          <UploadCloud size={48} className="text-gray-400 mb-4" />
          <p className="text-gray-600 mb-4 text-center">Drag and drop file di sini, atau klik tombol di bawah</p>
          <label className="cursor-pointer bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition font-medium">
            Pilih File
            <input 
              type="file" 
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
          {file && <p className="mt-4 text-sm font-medium text-emas">{file.name}</p>}
        </div>

        {preview.length > 0 && (
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Preview Data (5 baris pertama):</h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 px-4 text-gray-600">Name</th>
                    <th className="py-2 px-4 text-gray-600">Phone</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, idx) => (
                    <tr key={idx} className="border-b border-gray-100">
                      <td className="py-2 px-4">{row.name}</td>
                      <td className="py-2 px-4">{row.phone || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={!file || loading}
          className="w-full py-3 bg-primary text-emas rounded-xl font-bold hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Mengimport..." : "Mulai Import"}
        </button>

        {result && (
          <div className={`mt-6 p-4 rounded-lg ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
            <h3 className={`font-bold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
              {result.success ? 'Import Berhasil!' : 'Terjadi Kesalahan'}
            </h3>
            <p className="text-sm mt-1">Berhasil mengimport: {result.count} data tamu.</p>
            {result.failed && result.failed.length > 0 && (
              <p className="text-sm text-red-600 mt-2">
                Gagal mengimport {result.failed.length} data (mungkin nama kosong).
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
