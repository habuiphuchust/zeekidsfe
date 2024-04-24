export default {
  // Lưu phiên đăng nhập vào local storage
  saveSessionToken(token) {
    localStorage.setItem('session_token', token);
  },
  // Lấy phiên đăng nhập từ local storage
  getSessionToken() {
    return localStorage.getItem('session_token');
  },
  // Xóa phiên đăng nhập từ local storage
  clearSessionToken() {
    localStorage.removeItem('session_token');
  }

}
