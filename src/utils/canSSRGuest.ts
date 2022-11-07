import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'

import { parseCookies } from 'nookies'

// função para paginas que so podem ser acessadas por visitantes
export function canSSRGuest<p>(fn: GetServerSideProps<p>) {
  return async (
    ctx: GetServerSidePropsContext,
  ): Promise<GetServerSidePropsResult<p>> => {
    const cookies = parseCookies(ctx)
    // Se o user tentar acessar a pagina porem tendo ja um login salvo redirecionamos
    if (cookies['@nextauth.token']) {
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false,
        },
      }
    }

    return await fn(ctx)
  }
}
