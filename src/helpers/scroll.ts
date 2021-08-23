//scroll from HeaderBlock to small components
export const onScroll = (ref: any) => ref.current.scrollIntoView({block: "start", behavior: "smooth"})
