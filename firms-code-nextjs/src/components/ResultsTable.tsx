'use client';

interface FirmCode {
  code: string;
  name: string;
  type: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  status: string;
}

interface ResultsTableProps {
  matches: FirmCode[];
}

export default function ResultsTable({ matches }: ResultsTableProps) {
  const exportToCSV = () => {
    if (matches.length === 0) return;

    const headers = ['FIRMS Code', 'FIRMS Name', 'Facility Type', 'Street Address', 
                    'City', 'State', 'Zip', 'Country', 'FIRMS Status'];
    const csvRows = [
      headers.join(','),
      ...matches.map(item => 
        [item.code, item.name, item.type, item.address, item.city, 
         item.state, item.zip, item.country, item.status]
        .map(field => `"${field || ''}"`).join(',')
      )
    ];

    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `firms_search_results_${new Date().toISOString().split('T')[0]}.csv`;
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4">
      <div className="mb-2">
        {matches.length > 0 && (
          <div className="flex justify-between items-center">
            <div className="text-gray-600">
              Found {matches.length} match{matches.length === 1 ? '' : 'es'}.
            </div>
            <button
              className="btn btn-success"
              onClick={exportToCSV}
            >
              Export to CSV
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">FIRMS Code</th>
              <th className="border px-4 py-2">FIRMS Name</th>
              <th className="border px-4 py-2">Facility Type</th>
              <th className="border px-4 py-2">Street Address</th>
              <th className="border px-4 py-2">City</th>
              <th className="border px-4 py-2">State</th>
              <th className="border px-4 py-2">Zip</th>
              <th className="border px-4 py-2">Country</th>
              <th className="border px-4 py-2">FIRMS Status</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border px-4 py-2">{item.code}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.type}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.city}</td>
                <td className="border px-4 py-2">{item.state}</td>
                <td className="border px-4 py-2">{item.zip}</td>
                <td className="border px-4 py-2">{item.country}</td>
                <td className="border px-4 py-2">{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 