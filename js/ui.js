document.addEventListener('DOMContentLoaded', () => {
  const sideNav = document.querySelectorAll('.sidenav');
  M.Sidenav.init(sideNav, { edge: 'left' });
});
