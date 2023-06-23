  export function checkUsernameAvailability(user) {
    for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const item = JSON.parse(localStorage.getItem(key));
    
    if (item.username == user) {
      return false
    }
  }
  return true
  }