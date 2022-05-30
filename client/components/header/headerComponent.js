import Head from 'next/head'

import ToolBar from './Toolbar';
import RightHeader from './rightHeader'

export default function HeaderComponent(){
    return (
        <div>        
            <Head>
                <title>Soil</title>
            </Head>
            <ToolBar/>
        </div>
    )
}