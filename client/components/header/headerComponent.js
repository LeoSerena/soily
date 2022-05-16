import Head from 'next/head'

import HomeLink from './HomeLink';
import RightHeader from './rightHeader'

export default function HeaderComponent(){
    return (
        <div>        
            <Head>
                <title>Soil</title>
            </Head>
            <HomeLink/>
            <RightHeader/>
        </div>
    )
}