import classes from './TopBar.module.scss'
import Button from '../../form/Button/Button'

function TopBar() {
  return (
    <div className={classes.TopBar}>
      <button className={classes.avatarButton}>
        <img src="https://picsum.photos/100/100" alt="Avatar"/>
      </button>
      <button className={classes.contactButton}>
        <span></span>
      </button>

    </div>
  )
}

export default TopBar