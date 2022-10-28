import People from '../components/People';

export function HomePage(){
    return(        
        <div className='content'>
        <People 
            pageLimit={5}
            dataLimit={4} 
        />
        </div>
    )
}