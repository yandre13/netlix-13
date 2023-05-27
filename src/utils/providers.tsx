'use client'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
// import { useState } from 'react'
// import { Provider } from 'jotai'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 45000,
          suspense: true,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
          refetchOnReconnect: false,
          refetchInterval: false,
        },
      },
    })
  )
  return (
    <QueryClientProvider client={client}>
      {/* <Provider>{children}</Provider> */}
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
  // return <>{children}</>
}

export default Providers
