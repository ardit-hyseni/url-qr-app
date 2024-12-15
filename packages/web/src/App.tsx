import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'
import { UrlFormRequest, UrlObject } from '@url-program/common/dist/types'
import { UrlApiService } from './services/url.service'
import AnchorzUpLogo from './assets/AnchorzUp_Logo.png';

function App() {
  // const [count, setCount] = useState(0);
  const [urlForm, setUrlForm] = useState<UrlFormRequest>({ originalUrl: '', expirationMinutes: 0 });
  const [urlError, setUrlError] = useState<string>('');
  const [urls, setUrls] = useState<UrlObject[]>([]);
  const urlRegex = /^(http|https):\/\/[^\s]+$/;

  const urlApiService = useMemo(() => new UrlApiService(), []);

  const fetchAllUrls = useCallback(async () => {
    try {
      const response = await urlApiService.fetchAllUrls();
      setUrls(response);
    } catch (error) {
      console.error('Error fetching URLs:', error);
    }
  }, [urlApiService]);

  const deleteUrl = useCallback(async (id: number) => {
    try {
      await urlApiService.deleteUrl(id);
      fetchAllUrls();
    } catch (error) {
      console.error('Error deleting URL:', error);
    }
  }, [urlApiService]);

  useEffect(() => {
    if (urlForm.originalUrl.length > 0 && !urlRegex.test(urlForm.originalUrl)) {
      setUrlError('Please enter a valid URL that starts with http:// or https://');
    } else {
      setUrlError('');
    }
  }, [urlForm.originalUrl]);

  useEffect(() => {
    fetchAllUrls();
    // eslint-disable-next-line
  }, []);

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
            {/* <li className="border border-secondary mb-3 d-flex justify-content-between align-items-center">
              <a href="https://shorturl.co/ckrDR" className="text-primary text-decoration-none">https://shorturl.co/ckrDR</a>
              <button className="btn btn-link p-0 text-secondary">
                <i className="bi bi-trash"></i>
              </button>
            </li>
            <li className="mb-3 d-flex justify-content-between align-items-center">
              <a href="https://shorturl.co/cdbEa" className="text-primary text-decoration-none">https://shorturl.co/cdbEa</a>
              <button className="btn btn-link p-0 text-secondary">
                <i className="bi bi-trash"></i>
              </button>
            </li>
            <li className="mb-3 d-flex justify-content-between align-items-center">
              <a href="https://shorturl.co/3avoE" className="text-primary text-decoration-none">https://shorturl.co/3avoE</a>
              <button type="button" className="btn btn-link p-0 text-secondary">
                <i className="bi bi-trash"></i>
              </button>
            </li> */}
            {urls.map(url => {
              return <li key={url.id} className="mb-3 d-flex justify-content-between align-items-center">
                <a href={"https://www.google.com"} className="text-primary text-decoration-none">{url.shortUrl}</a>
                <button type="button" className="btn btn-link p-0 text-secondary">
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
          {JSON.stringify(urlForm)}
          {urlError.length > 0 &&
            <div className="alert alert-warning" role="alert">
              {urlError}
            </div>
          }
          <div className="d-flex align-items-center mb-4">
            <button className="btn btn-primary fw-bold text-uppercase" style={{ backgroundColor: '#7E2A94' }}>
              Shorten URL
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App
