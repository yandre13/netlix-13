import { useCallback, useEffect } from 'react'
import useMediaQuery from './useMediaQuery'
import {
  calculateTranslate,
  generateLastSelector,
  getSequenceClose,
  getSequenceEnter,
  getSequenceLeave,
  getSequenceOpen,
} from '@/utils/carousel'
import { animate } from 'framer-motion'

export const MAX_PER_VIEW = 4

const selector = '.splide__slide'
const baseSelector = `${selector}.is-active`
const lastSelector = generateLastSelector(MAX_PER_VIEW, baseSelector, selector)

const getOrigin = (ref: HTMLDivElement | null, parentId: string | null) => {
  if (!parentId) throw new Error('Parent id is required')
  const firstElementChild =
    document.querySelector(`#${parentId} ${baseSelector}.is-active`)
      ?.firstElementChild?.firstElementChild || null
  const lastElementChild =
    document.querySelector(`#${parentId} ${lastSelector}`)?.firstElementChild
      ?.firstElementChild || null
  const isFirst = ref?.firstElementChild === firstElementChild
  const isLast = ref?.firstElementChild === lastElementChild
  return isFirst ? 'left' : isLast ? 'right' : 'center'
}

export function useAnimateCard({
  open,
  elementRef,
  onClose,
  onOpen,
  sizes,
}: {
  open: boolean
  elementRef: HTMLDivElement | null
  onOpen?: () => void
  onClose?: () => void
  sizes: {
    open: {
      maxWidth: number
      maxHeight: number
    }
  }
}) {
  const isMd = useMediaQuery('(min-width: 768px)')
  const newId = elementRef?.id.replace(/:/g, '\\:')!

  const handleCardHover = useCallback(() => {
    if (!open && isMd) {
      const carouselId = elementRef?.parentElement?.parentElement?.id!
      const parentCarouselId =
        elementRef?.parentElement?.parentElement?.parentElement?.id!
      const origin = getOrigin(elementRef, carouselId)
      const sequence = getSequenceEnter(newId, parentCarouselId, origin)
      // @ts-ignore
      animate(sequence)
    }
  }, [open, isMd, elementRef, newId])
  const handleCardLeave = useCallback(() => {
    if (!open && isMd) {
      const parentCarouselId =
        elementRef?.parentElement?.parentElement?.parentElement?.id!
      const sequence = getSequenceLeave(newId, parentCarouselId)
      // @ts-ignore
      animate(sequence)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isMd, newId])

  const handleCardOpen = useCallback(() => {
    if (!open && isMd) {
      onOpen?.()
      const exes = calculateTranslate(elementRef, sizes.open)
      const parentLi = elementRef?.parentElement!
      const maxWidth = parentLi.clientWidth - MAX_PER_VIEW
      const sequence = getSequenceOpen(
        newId,
        exes,
        sizes.open.maxWidth,
        maxWidth
      )
      // @ts-ignore
      animate(sequence)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, isMd, newId, open])
  const handleCardClose = useCallback(() => {
    if (elementRef) {
      elementRef?.firstElementChild?.scrollTo?.({
        top: 0,
        behavior: 'smooth',
      })
    }

    if (open && isMd) {
      const parentLi = elementRef?.parentElement!
      const maxWidth = parentLi.clientWidth - MAX_PER_VIEW
      const sequence = getSequenceClose(newId, maxWidth)
      // @ts-ignore
      animate(sequence).then(() => {
        const sequence2 = [
          [
            `#${newId}`,
            {
              position: 'static',
              zIndex: 0,
            },
            { duration: 0.001, at: 0.6 },
          ],
        ]
        // @ts-ignore
        animate(sequence2)
        // setOpen(false)
        // setOpenModal(false)
        onClose?.()
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, isMd, newId, onClose, open])

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === 'Escape' && open) {
        handleCardClose()
      }
    }
    document.addEventListener('keydown', handleKeyPress)

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleCardClose, open])

  useEffect(() => {
    const overlay = document.querySelector('.Overlay') as HTMLElement
    if (overlay && open) {
      overlay.addEventListener('click', handleCardClose)
    }
    return () => {
      if (overlay) {
        overlay.removeEventListener('click', handleCardClose)
      }
    }
  }, [handleCardClose, open])
  useEffect(() => {
    if (open) {
      const sequence = [
        [`.TextInfo`, { opacity: 1 }, { duration: 0.6, at: 0.2 }],
      ]
      // @ts-ignore
      animate(sequence)
    }
  }, [open])

  return {
    handleCardHover,
    handleCardLeave,
    handleCardOpen,
    handleCardClose,
  }
}
