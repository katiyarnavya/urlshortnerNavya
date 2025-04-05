import { useState } from 'react'
import './App.css'

function App() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [urlLoadError, setUrlLoadError] = useState(false)

  const generateShortUrl = async (longUrl) => {
    setUrlLoadError(false)
    try {
      const response = await fetch('https://url-shortner-iit-kgp.el.r.appspot.com/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ longUrl }),
      })

      if (!response.ok) {
        setUrlLoadError(true)
        return null
      }

      const data = await response.json()
      return data.shortUrl
    } catch (error) {
      setUrlLoadError(true)
      console.error('Error shortening URL:', error.message)
      return null
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!url) {
      setMessage('Please enter a URL')
      return
    }

    setLoading(true)
    setMessage('')
    try {
      const shortened = await generateShortUrl(url) // 🛠️ Await here!
      if (shortened) {
        setShortUrl(shortened)
        setMessage('URL shortened successfully!')
      } else {
        setShortUrl('')
        setMessage('Failed to shorten URL')
      }
    } catch (error) {
      setMessage('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setMessage('Copied to clipboard!')
    } catch (err) {
      setMessage('Failed to copy')
    }
  }

  return (
    <div className="app-container">
      <div className="content">
        <h1>URL Shortener</h1>
        <p>Enter your long URL and get a shortened version</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your URL here"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Shortening...' : 'Shorten URL'}
            </button>
          </div>
        </form>

        {message && <p className="message">{message}</p>}

        {shortUrl && (
          <div className="result">
            <p>Your shortened URL:</p>
            <a className="short-url" href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
