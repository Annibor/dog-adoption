import logoImage from '../images/logo.png'

function Logo() {
  return (
    <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
      <img src={logoImage} alt="Dog Adoption Logo" style={{ height: '4rem' }} />
    </a>
  )
}

export default Logo