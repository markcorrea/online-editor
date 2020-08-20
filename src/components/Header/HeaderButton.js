import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import styles from './index.module.scss'

const HeaderButton = ({label, icon, onClick, type}) => (
  <div className={clsx(styles.button, styles[type])} onClick={onClick}>
    {icon && (
      <span>
        <i className={`fa fa-${icon}`} />
      </span>
    )}
    {label && <span>&nbsp;&nbsp;{label}</span>}
  </div>
)

HeaderButton.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
}

HeaderButton.defaultProps = {
  icon: null,
  type: 'default',
}

export default HeaderButton
