import React, { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { UrlFormRequest, UrlObject } from '@url-program/common/dist/types'
import { UrlApiService } from './services/url.service'
import AnchorzUpLogo from './assets/AnchorzUp_Logo.png';
import { toast } from 'react-toastify';

function App() {
  // const [count, setCount] = useState(0);
  const initialUrlForm = {
    originalUrl: '',
    expirationMinutes: 0
  }
  const [urlForm, setUrlForm] = useState<UrlFormRequest>(initialUrlForm);
  const [urlError, setUrlError] = useState<string>('');
  const [urls, setUrls] = useState<UrlObject[]>([]);
  const urlRegex = /^(http|https):\/\/[^\s]+$/;

  const urlApiService = useMemo(() => new UrlApiService(), []);

  const fetchAllUrls = useCallback(async () => {
    try {
      const response = await urlApiService.fetchAllUrls();
      setUrls(response);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [urlApiService]);

  const deleteUrl = useCallback(async (id: number) => {
    try {
      const response = await urlApiService.deleteUrl(id); // Delete the URL from the server
      if (response) {
        // setUrls(prevUrls => prevUrls.filter(url => url.id !== id));
        fetchAllUrls();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [urlApiService]);

  const createUrl = useCallback(async () => {
    try {
      if (urlForm.originalUrl.length > 0 && !urlRegex.test(urlForm.originalUrl)) {
        setUrlError('Please enter a valid URL that starts with http:// or https://');
        return;
      }
      setUrlError('');
      await urlApiService.createUrl(urlForm);
      fetchAllUrls();
      setUrlForm(initialUrlForm);
    } catch (error: any) {
      toast.error(error.message);
    }
  }, [urlApiService, urlForm]);

  const handleLinkClick = async (e: React.MouseEvent<HTMLAnchorElement>, id: number, originalUrl: string) => {
    e.preventDefault(); // Prevent the default navigation
    try {
      await urlApiService.incrementClickCount(id); // Send the increment request
      fetchAllUrls();
      window.open(originalUrl, '_blank'); // Open the original URL in a new tab
    } catch (error: any) {
      toast.error('Failed to increment click count'); // Handle errors
    }
  };

  useEffect(() => {
    fetchAllUrls();
  }, [fetchAllUrls]);

  return (
    <>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="bg-light p-3" style={{ width: '400px', height: '100vh' }}>
          <div className="text-center mb-4">
            <img src={AnchorzUpLogo} alt="Logo" style={{ width: '200px' }} />
          </div>
          <h5 className="mb-3 fw-bold">My shortened URLs</h5>
          <ul className="list-unstyled">
            {urls && urls.length > 0 && urls.map(url => {
              return <li key={url.id} className="p-2 my-3 d-flex justify-content-between align-items-center">
                <div style={{ textAlign: 'center' }}>
                  <a href={url.originalUrl} onClick={(e) => handleLinkClick(e, url.id, url.originalUrl)} className="text-primary text-decoration-none">{url.shortUrl}</a>
                  <span className="d-block mt-1 clickspan">
                    This link has been clicked {url.clickCount} {url.clickCount === 1 ? 'time' : 'times'}.
                  </span>

                </div>
                <img src={url.qrCode} alt="QR Code" />
                <button type="button" onClick={() => deleteUrl(url.id)} className="btn btn-link p-0 text-secondary">
                  <i className="bi bi-trash"></i>
                </button>
              </li>
            })}
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-grow-1 p-4">
          <h2 className="fw-bold mb-4">URL Shortener</h2>
          <div className="d-flex">
            <div className="mb-3 flex-grow-1">
              <input
                type="text"
                onChange={(e) => setUrlForm({ ...urlForm, originalUrl: e.target.value })}
                value={urlForm.originalUrl}
                className="form-control mb-2"
                placeholder="Paste the URL to be shortened"
              />
            </div>
            <div className="me-2">
              <select value={urlForm.expirationMinutes} onChange={(e) => setUrlForm({ ...urlForm, expirationMinutes: Number(e.target.value) })} className="form-select">
                <option disabled selected value={0}>Add expiration date</option>
                <option value={1}>1 minute</option>
                <option value={5}>5 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={300}>5 hours</option>
              </select>
            </div>

          </div>
          {urlError.length > 0 &&
            <div className="alert alert-warning" role="alert">
              {urlError}
            </div>
          }
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-primary fw-bold text-uppercase" disabled={urlForm.originalUrl.length === 0} onClick={createUrl} style={{ backgroundColor: '#7E2A94' }}>
              Shorten URL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
