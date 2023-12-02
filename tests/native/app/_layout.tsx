import { Link, Slot } from 'expo-router'
import { ScrollView, View } from 'react-native'
import { TailwindProvider, useTailwind } from 'tailwind-rn'
import utilities from '../tailwind.json'

const pages = ['index', 'smooth', 'eyeballs'] as const

function Layout() {
  const tailwind = useTailwind()
  return (
    <View style={tailwind('h-full')}>
      <ScrollView style={tailwind('flex-1')}>
        <Slot />
      </ScrollView>
      <View style={tailwind('bg-slate-100 absolute bottom-0 w-full h-16 flex flex-row items-center border-t border-slate-200')}>
        {pages.map(name => (
          <Link key={name} href={name} style={tailwind('text-base text-slate-950 font-medium text-center flex-1 capitalize')}>
            {name}
          </Link>
        ))}
      </View>
    </View>
  )
}

export default function Root() {
  return (
    //@ts-ignore
    <TailwindProvider utilities={utilities}>
      <Layout />
    </TailwindProvider>
  )
}
