const dragMenu = setMenuWidth => {
  const viewportWidth = document.body.clientWidth
  const viewportHeight = document.body.clientHeight

  const isOutOfScreen = event =>
    event.clientX < 10 || event.clientX > viewportWidth - 10 || event.clientY < 10 || event.clientY > viewportHeight - 10

  const handleDraggable = () => {
    document.body.addEventListener('mousemove', calculate)
    document.body.addEventListener('mouseup', clearListeners)
  }

  const calculate = () => {
    const event = window.event
    if (isOutOfScreen(event)) clearListeners()

    if (event.clientX > 200 && event.clientX < viewportWidth - 150) {
      setMenuWidth(event.clientX)
    }
  }

  const clearListeners = () => {
    document.body.removeEventListener('mousemove', calculate)
    document.body.removeEventListener('mouseup', clearListeners)
  }
  return handleDraggable()
}

export default dragMenu
