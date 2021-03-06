//Importações relativas a navegação de telas
import { useNavigate }        from 'react-router-dom';

//Importações de imagens
import illustrationImg        from '../assets/images/illustration.svg';
import logoImg                from '../assets/images/logo.svg';
import googleIconImg          from '../assets/images/google-icon.svg'

import { Button }             from '../components/Button';
import '../styles/auth.scss'

//Importações relativas a contextos
import { useAuth }            from '../hooks/useAuth';



export function Home(){
    
    const navigate = useNavigate();

    const { signInWithGoogle, user } = useAuth();



    async function handleCreateRoom(){
        if(!user){
            await signInWithGoogle();
        }

        navigate('/rooms/new')
    }
    
    return(
        <div id = "page-auth">
            <aside>
                <img src ={illustrationImg} alt ="ilustração"/>
                <strong> Crie salas de Q&amp;A ao-vivo </strong>
                <p> Tire as dúvidas da sua audiência em tempo real </p>
            </aside>
            
            <main>
                <div className="main-content">
                    <img src = {logoImg} alt = "logo"/>

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src = {googleIconImg} alt = "google-logo"/>
                        Crie sua sala com o Google
                    </button>

                    <div className="separator"> ou entre em uma sala </div>

                    <form>
                        <input
                            type = "text"
                            placeholder= "Digite o código da sala"
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}