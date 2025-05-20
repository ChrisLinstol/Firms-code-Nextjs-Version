'use client';

import { useState } from 'react';

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

interface SearchOptionsProps {
  codes: FirmCode[];
  isDataLoaded: boolean;
  onSearch: (matches: FirmCode[]) => void;
}

export default function SearchOptions({ codes, isDataLoaded, onSearch }: SearchOptionsProps) {
  const [searchMode, setSearchMode] = useState<'general' | 'specific'>('general');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [searchTerms, setSearchTerms] = useState({
    general: '',
    firmCode: '',
    firmName: '',
    facilityType: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    status: ''
  });

  const createRegex = (term: string, caseSensitive: boolean) => {
    if (!term) return null;
    return new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), caseSensitive ? '' : 'i');
  };

  const handleSearch = () => {
    if (!isDataLoaded) {
      return;
    }

    let matches: FirmCode[] = [];

    if (searchMode === 'general') {
      const searchTerm = searchTerms.general.trim();
      if (!searchTerm) return;

      const regex = createRegex(searchTerm, caseSensitive);
      matches = codes.filter(item =>
        Object.values(item).some(value => regex?.test(value))
      );
    } else {
      const fields = {
        code: searchTerms.firmCode,
        name: searchTerms.firmName,
        type: searchTerms.facilityType,
        address: searchTerms.address,
        city: searchTerms.city,
        state: searchTerms.state,
        zip: searchTerms.zip,
        country: searchTerms.country,
        status: searchTerms.status
      };

      const hasSearchTerm = Object.values(fields).some(term => term.trim());

      if (!hasSearchTerm) return;

      const regexes = Object.entries(fields).reduce((acc, [key, term]) => {
        acc[key] = term.trim() ? createRegex(term, caseSensitive) : null;
        return acc;
      }, {} as Record<string, RegExp | null>);

      matches = codes.filter(item =>
        Object.entries(regexes).every(([key, regex]) =>
          !regex || regex.test(item[key as keyof FirmCode])
        )
      );
    }

    onSearch(matches);
  };

  const handleClear = () => {
    setSearchTerms({
      general: '',
      firmCode: '',
      firmName: '',
      facilityType: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      country: '',
      status: ''
    });
    onSearch([]);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <select
          className="form-select"
          value={searchMode}
          onChange={(e) => setSearchMode(e.target.value as 'general' | 'specific')}
        >
          <option value="general">General Search (All Fields)</option>
          <option value="specific">Search By Specific Fields</option>
        </select>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="caseSensitive"
            className="form-checkbox mr-2"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          <label htmlFor="caseSensitive">Case Sensitive</label>
        </div>
      </div>

      {searchMode === 'general' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <input
              type="text"
              className="form-input w-full"
              placeholder="Enter search term (searches across all fields)"
              value={searchTerms.general}
              onChange={(e) => handleInputChange('general', e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="flex gap-2">
            <button
              className="btn btn-primary flex-1"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="btn btn-secondary flex-1"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">FIRMS Code:</label>
              <input
                type="text"
                className="form-input w-full"
                placeholder="C556"
                value={searchTerms.firmCode}
                onChange={(e) => handleInputChange('firmCode', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">FIRMS Name:</label>
              <input
                type="text"
                className="form-input w-full"
                placeholder="Michael Lewis"
                value={searchTerms.firmName}
                onChange={(e) => handleInputChange('firmName', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Facility Type:</label>
              <select
                className="form-select w-full"
                value={searchTerms.facilityType}
                onChange={(e) => handleInputChange('facilityType', e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="Bonded Warehouse">Bonded Warehouse</option>
                <option value="Bridge">Bridge</option>
                <option value="CES">CES</option>
                <option value="Customs Administrative Site">Customs Administrative Site</option>
                <option value="Customs Container Station">Customs Container Station</option>
                <option value="Data Processing Site">Data Processing Site</option>
                <option value="Foreign Trade Zone">Foreign Trade Zone</option>
                <option value="Importer Premises">Importer Premises</option>
                <option value="Inspection Facility">Inspection Facility</option>
                <option value="Multi-Use-Bonded">Multi-Use-Bonded</option>
                <option value="Pier">Pier</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Street Address:</label>
              <input
                type="text"
                className="form-input w-full"
                value={searchTerms.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">City:</label>
              <input
                type="text"
                className="form-input w-full"
                value={searchTerms.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">State:</label>
              <input
                type="text"
                className="form-input w-full"
                placeholder="CA"
                value={searchTerms.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold mb-1">Zip:</label>
              <input
                type="text"
                className="form-input w-full"
                value={searchTerms.zip}
                onChange={(e) => handleInputChange('zip', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">Country:</label>
              <input
                type="text"
                className="form-input w-full"
                value={searchTerms.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <div>
              <label className="block font-bold mb-1">FIRMS Status:</label>
              <select
                className="form-select w-full"
                value={searchTerms.status}
                onChange={(e) => handleInputChange('status', e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="DEACTIVATED">Deactivated</option>
                <option value="ACTIVATED">Activated</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="btn btn-primary flex-1"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="btn btn-secondary flex-1"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 