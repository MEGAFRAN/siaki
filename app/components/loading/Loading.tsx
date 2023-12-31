import { useState, useEffect, memo, useCallback } from "react"
import { LoadingProps } from "../../constants/types/components_props/types"
import styles from "../../styles/components/loading.module.scss"

const Loading = ({ isLoading, maxProgress, loadingMessage }: LoadingProps) => {
  const [progressValue, setProgressValue] = useState(0)

  const incrementProgressValue = useCallback(() => {
    setProgressValue((prevProgressValue) => prevProgressValue + 1)
  }, [])

  useEffect(() => {
    let intervalId: number | undefined

    if (isLoading) {
      intervalId = window.setInterval(incrementProgressValue, 100)
    } else {
      clearInterval(intervalId)
      setProgressValue(0)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [isLoading, incrementProgressValue])

  return (
    <>
      {isLoading ? (
        <div className={styles.container}>
          <span>{loadingMessage}</span>
          <progress
            value={progressValue}
            max={maxProgress}
            role="progressbar"
            aria-valuetext={`Loading ${loadingMessage}: ${progressValue}%`}
            aria-label="Loading progress"
          ></progress>
        </div>
      ) : null}
    </>
  )
}

export default memo(Loading)
