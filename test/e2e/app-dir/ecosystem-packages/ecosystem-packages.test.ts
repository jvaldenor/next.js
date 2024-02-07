import { createNextDescribe } from 'e2e-utils'
import { packageList } from './package-list'
import { normalizePackageName } from './generate-helpers'

jest.setTimeout(60 * 1000 * 10)

createNextDescribe(
  'ecosystem-packages',
  {
    files: __dirname,
    dependencies: require('./package.json').dependencies,
  },
  ({ next }) => {
    for (const packageName of packageList) {
      const normalizedPackageName = normalizePackageName(packageName)
      it(`should render with ${packageName}`, async () => {
        const browser = await next.browser(`/list/${normalizedPackageName}`)
        expect(await browser.elementByCss('h1').text()).toBe('Hello World')
      })
    }
  }
)
