import { serve } from '@hono/node-server'
import { serveStatic } from '@hono/node-server/serve-static'
import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { onChallengeResponse, onChallengeExpired, onChallengeError } from '@gotcha-widget/lib';
// import { neynar } from 'frog/hubs'


export const app = new Frog({
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Frog Frame',
})

app.use('/*', serveStatic({ root: './public' }))

app.frame('/', (c) => {
  const { buttonValue, inputText, status , deriveState} = c
  const fruit = inputText || buttonValue
  if(buttonValue === 'summit'){
    // window.open("https://341f498351aa.ngrok.app/", '#')
  }
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {inputText==undefined?'Fill your wallet bellow':'Checking....'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter your wallet..." />,
      <Button.Redirect location="https://341f498351aa.ngrok.app/">Give Me 💧</Button.Redirect>
    ],
  })
})

const port = 3000
console.log(`Server is running on port ${port}`)

devtools(app, { serveStatic })

serve({
  fetch: app.fetch,
  port,
})
