import classes from './TopBar.module.scss'
import Button from '../../form/Button/Button'

interface ITopBar {
  setIsShowContact: (isShow: boolean) => void
}

function TopBar({setIsShowContact}: ITopBar) {
  return (
    <div className={classes.TopBar}>
      <button className={classes.avatarButton}>
        <img src="https://picsum.photos/100/100" alt="Avatar"/>
      </button>
      <button className={classes.contactButton} onClick={() => setIsShowContact(true)}>
        <span></span>
      </button>

    </div>
  )
}

export default TopBar