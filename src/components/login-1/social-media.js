import {FiTwitter, FiFacebook, FiGithub} from 'react-icons/fi'
import {FaLine, FaFacebook} from 'react-icons/fa'
import ss3aConf from '../../conf/ss3a_conf'
import axios from "axios";
import {setAuthData} from "../../actions/member";


const SocialMedia = (props) => {

    const loginWithLine = props?.loginWithLine;



    return (
        <div className="w-full flex flex-col text-center">
            <div className="mb-2">其他方式登入</div>
            <div className="flex w-full flex-row justify-center items-center space-x-2">
                {
                    ss3aConf.OptionalLoginModules.includes('facebook') &&
                    <button
                        className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">
                        <FaFacebook className="stroke-current text-2xl text-facebook"/>
                    </button>
                }
                {
                    ss3aConf.OptionalLoginModules.includes('line') &&
                    <a
                        className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent"
                        href={'/api/login/line'}
                    >
                        <FaLine className="stroke-current text-2xl text-line"/>
                    </a>
                }

                {/*<button className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">*/}
                {/*  <FiTwitter className="stroke-current text-xl text-twitter" />*/}
                {/*</button>*/}
                {/*<button className="btn btn-circle bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">*/}
                {/*  <FiGithub className="stroke-current text-xl text-github" />*/}
                {/*</button>*/}
            </div>
        </div>
    )
}

export default SocialMedia
