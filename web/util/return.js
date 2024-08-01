async function initialize() {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get('session_id');

    if (!sessionId) {
      throw new Error('Session ID is missing in the query string');
    }

    const response = await fetch(`/session-status?session_id=${sessionId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const session = await response.json();

    if (session.status === 'open') {
      return false;
    } else if (session.status === 'complete') {
      return true;
    } else {
      throw new Error('Unexpected session status');
    }
  } catch (error) {
    console.error('Error initializing session:', error);
    return null;
  }
}

module.exports = {
  initialize,
};
