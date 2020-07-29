import React,{Component} from 'react';
import AppHeader from './components/plantilla/AppHeader'
import AppMenu from './components/plantilla/AppMenu';
import AppBody from './components/plantilla/AppBody';
import AppFooter from './components/plantilla/AppFooter';

class Application extends Component {
    render(){
        return(
            <div className="wrapper">
                <AppHeader />
                <AppMenu />
                <div className="content-wrapper">
                    <section className="content">
                        <AppBody />
                    </section>
                </div>
                <AppFooter />
            </div>
        )
    }
}

export default Application


