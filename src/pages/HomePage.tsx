import People from '../components/People';
import Search from '../components/Search';

export function HomePage(){
    return(        
        <div id='content'>
        <Search />
        <People 
            pageLimit={5}
            dataLimit={4} 
        />
        </div>
    )
}