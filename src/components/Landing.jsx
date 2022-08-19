import React, {useState,useRef} from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import { ethers } from "ethers";
//integrating sequence wallet
import { sequence } from "0xsequence";
// import 'react-toastify/dist/ReactToastify.css';
import '../style/Header.css';
import { Link } from "react-router-dom";
import logo from '../logo.jpg';
import meta from '../metamask.png';
import sequence_logo from '../sequence-logo.svg'
// import land from '../landing.png'; 
import { FiUpload }from 'react-icons/fi';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { MdOutlineFormatColorReset } from 'react-icons/md'
import '../style/Landing.css';

const Landing = (props) => {
    // const notify = () => toast("Please Connect Wallet!");
    // const defaultRow = { firstName:'', lastName:'' };
    const [isOpen, setIsOpen] = useState(false)
    //state to add new row fro properties
    const [newrowinput, setNewRowInput] = useState([]);
    // const [sequenceconnected, setSequenceConnected] = useState(false);
    // const [walletaddress, setWalletAddress] = useState('');
    const [explore, setExplore] = useState(false);
    const [signmodal, setSignModal] = useState(false);

    // const wallet = {walletaddress};

    //function to handle put onchange
    const handleInputChange = (event, index) => {
      const {name, value} = event.target;
      const propertyList = [...newrowinput];
      propertyList[index][name] = value;
      //set the propertyList to the newrowinput
      setNewRowInput(propertyList);
    }

    //functn that triggers the btn to remove a row.
    const removeRow = (index) => {
      //define the list
      const propertyList = [...newrowinput];
      propertyList.splice(index,1) //this line deletes that particular row, by targeting the exact index
      setNewRowInput(propertyList);
    }

    //function to add a new row
    const addRow = () => {
      setNewRowInput([...newrowinput, []]);
    }

    const hiddenFileInput = useRef(null);
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        props.handleFile(fileUploaded);
    };

    const openModal = () => {
      setIsOpen(true);
    }
  
    const closeModal = () => {
      setIsOpen(false);
    }
  
     // usetstate for storing and retrieving wallet details
    const [data, setData] = useState({
      address:'',
      Balance: null,
    })

    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {
      // Checking if metamask is already present or not
      if (window.ethereum) {
        // res[0] for fetching a first wallet
        window.ethereum
          .request({ method: "eth_requestAccounts" })
          .then((res) => accountChangeHandler(res[0]));
      } else {
        alert("install metamask extension!!");
      }
    };

    // getbalance function for getting a balance in
    // a right format with help of ethers
    const getbalance = (address) => {
      // Requesting balance method
      window.ethereum
        .request({ 
          method: "eth_getBalance", 
          params: [address, "latest"] 
        })
        .then((balance) => {
          // Setting balance
          setData({
            Balance: ethers.utils.formatEther(balance),
          });
        });
    };

    // Function for handling all events
    const accountChangeHandler = (account) => {
      // Setting an address data
      setData({
        address: account,
      });
      // Setting a balance
      getbalance(account);
    };

    //sequence wallet Setup
    
    async function connectWallet() {
      sequence.initWallet('polygon');
      const user_wallet = sequence.getWallet();
      const connectDetails = await user_wallet.connect({
        app: 'Certaine',
        authorize: true,
        // And pass settings if you would like to customize further
        settings: {
          theme: "light",
          bannerUrl: "https://yoursite.com/banner-image.png",  // 3:1 aspect ratio, 1200x400 works best
          includedPaymentProviders: ["moonpay", "ramp"],
          defaultFundingCurrency: "matic",
          lockFundingCurrencyToDefault: false,
        }
      })

      user_wallet.openWallet();
      console.log('user accepted connect?', connectDetails.connected)
      console.log('users signed connect proof to valid their account address:', connectDetails.proof)
      
      // if (connectDetails.connected === true) {
      //   setSequenceConnected(true)
      // } else {
      //   setSequenceConnected(false)
      // }
      const address = user_wallet.getAddress();
      console.log(address);
    }

    const Greeter =  
    {
      "_format": "hh-sol-artifact-1",
      "contractName": "Greeter",
      "sourceName": "contracts/Greeter.sol",
      "abi": [
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "inputs": [],
          "name": "greet",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "string",
              "name": "_greeting",
              "type": "string"
            }
          ],
          "name": "setGreeting",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        }
      ],
      "bytecode": "0x60806040523480156200001157600080fd5b5060405162000c3238038062000c32833981810160405281019062000037919062000278565b6200006760405180606001604052806022815260200162000c1060229139826200008760201b620001ce1760201c565b80600090805190602001906200007f92919062000156565b5050620004c5565b620001298282604051602401620000a0929190620002fe565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff83818316178352505050506200012d60201b60201c565b5050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b8280546200016490620003ea565b90600052602060002090601f016020900481019282620001885760008555620001d4565b82601f10620001a357805160ff1916838001178555620001d4565b82800160010185558215620001d4579182015b82811115620001d3578251825591602001919060010190620001b6565b5b509050620001e39190620001e7565b5090565b5b8082111562000202576000816000905550600101620001e8565b5090565b60006200021d620002178462000362565b62000339565b9050828152602081018484840111156200023657600080fd5b62000243848285620003b4565b509392505050565b600082601f8301126200025d57600080fd5b81516200026f84826020860162000206565b91505092915050565b6000602082840312156200028b57600080fd5b600082015167ffffffffffffffff811115620002a657600080fd5b620002b4848285016200024b565b91505092915050565b6000620002ca8262000398565b620002d68185620003a3565b9350620002e8818560208601620003b4565b620002f381620004b4565b840191505092915050565b600060408201905081810360008301526200031a8185620002bd565b90508181036020830152620003308184620002bd565b90509392505050565b60006200034562000358565b905062000353828262000420565b919050565b6000604051905090565b600067ffffffffffffffff82111562000380576200037f62000485565b5b6200038b82620004b4565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015620003d4578082015181840152602081019050620003b7565b83811115620003e4576000848401525b50505050565b600060028204905060018216806200040357607f821691505b602082108114156200041a576200041962000456565b5b50919050565b6200042b82620004b4565b810181811067ffffffffffffffff821117156200044d576200044c62000485565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b61073b80620004d56000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610057575b600080fd5b6100556004803603810190610050919061043d565b610075565b005b61005f61013c565b60405161006c91906104b7565b60405180910390f35b6101226040518060600160405280602381526020016106e3602391396000805461009e90610610565b80601f01602080910402602001604051908101604052809291908181526020018280546100ca90610610565b80156101175780601f106100ec57610100808354040283529160200191610117565b820191906000526020600020905b8154815290600101906020018083116100fa57829003601f168201915b50505050508361026a565b8060009080519060200190610138929190610332565b5050565b60606000805461014b90610610565b80601f016020809104026020016040519081016040528092919081815260200182805461017790610610565b80156101c45780601f10610199576101008083540402835291602001916101c4565b820191906000526020600020905b8154815290600101906020018083116101a757829003601f168201915b5050505050905090565b61026682826040516024016101e49291906104d9565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610309565b5050565b61030483838360405160240161028293929190610510565b6040516020818303038152906040527f2ced7cef000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610309565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b82805461033e90610610565b90600052602060002090601f01602090048101928261036057600085556103a7565b82601f1061037957805160ff19168380011785556103a7565b828001600101855582156103a7579182015b828111156103a657825182559160200191906001019061038b565b5b5090506103b491906103b8565b5090565b5b808211156103d15760008160009055506001016103b9565b5090565b60006103e86103e384610581565b61055c565b90508281526020810184848401111561040057600080fd5b61040b8482856105ce565b509392505050565b600082601f83011261042457600080fd5b81356104348482602086016103d5565b91505092915050565b60006020828403121561044f57600080fd5b600082013567ffffffffffffffff81111561046957600080fd5b61047584828501610413565b91505092915050565b6000610489826105b2565b61049381856105bd565b93506104a38185602086016105dd565b6104ac816106d1565b840191505092915050565b600060208201905081810360008301526104d1818461047e565b905092915050565b600060408201905081810360008301526104f3818561047e565b90508181036020830152610507818461047e565b90509392505050565b6000606082019050818103600083015261052a818661047e565b9050818103602083015261053e818561047e565b90508181036040830152610552818461047e565b9050949350505050565b6000610566610577565b90506105728282610642565b919050565b6000604051905090565b600067ffffffffffffffff82111561059c5761059b6106a2565b5b6105a5826106d1565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b82818337600083830152505050565b60005b838110156105fb5780820151818401526020810190506105e0565b8381111561060a576000848401525b50505050565b6000600282049050600182168061062857607f821691505b6020821081141561063c5761063b610673565b5b50919050565b61064b826106d1565b810181811067ffffffffffffffff8211171561066a576106696106a2565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a26469706673582212202c200df30f04df9bafd76ab09ea27f670c31a939b33f7d40ebb5df54f1c4831764736f6c634300080300334465706c6f79696e67206120477265657465722077697468206772656574696e673a",
      "deployedBytecode": "0x608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610057575b600080fd5b6100556004803603810190610050919061043d565b610075565b005b61005f61013c565b60405161006c91906104b7565b60405180910390f35b6101226040518060600160405280602381526020016106e3602391396000805461009e90610610565b80601f01602080910402602001604051908101604052809291908181526020018280546100ca90610610565b80156101175780601f106100ec57610100808354040283529160200191610117565b820191906000526020600020905b8154815290600101906020018083116100fa57829003601f168201915b50505050508361026a565b8060009080519060200190610138929190610332565b5050565b60606000805461014b90610610565b80601f016020809104026020016040519081016040528092919081815260200182805461017790610610565b80156101c45780601f10610199576101008083540402835291602001916101c4565b820191906000526020600020905b8154815290600101906020018083116101a757829003601f168201915b5050505050905090565b61026682826040516024016101e49291906104d9565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610309565b5050565b61030483838360405160240161028293929190610510565b6040516020818303038152906040527f2ced7cef000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610309565b505050565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b82805461033e90610610565b90600052602060002090601f01602090048101928261036057600085556103a7565b82601f1061037957805160ff19168380011785556103a7565b828001600101855582156103a7579182015b828111156103a657825182559160200191906001019061038b565b5b5090506103b491906103b8565b5090565b5b808211156103d15760008160009055506001016103b9565b5090565b60006103e86103e384610581565b61055c565b90508281526020810184848401111561040057600080fd5b61040b8482856105ce565b509392505050565b600082601f83011261042457600080fd5b81356104348482602086016103d5565b91505092915050565b60006020828403121561044f57600080fd5b600082013567ffffffffffffffff81111561046957600080fd5b61047584828501610413565b91505092915050565b6000610489826105b2565b61049381856105bd565b93506104a38185602086016105dd565b6104ac816106d1565b840191505092915050565b600060208201905081810360008301526104d1818461047e565b905092915050565b600060408201905081810360008301526104f3818561047e565b90508181036020830152610507818461047e565b90509392505050565b6000606082019050818103600083015261052a818661047e565b9050818103602083015261053e818561047e565b90508181036040830152610552818461047e565b9050949350505050565b6000610566610577565b90506105728282610642565b919050565b6000604051905090565b600067ffffffffffffffff82111561059c5761059b6106a2565b5b6105a5826106d1565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b82818337600083830152505050565b60005b838110156105fb5780820151818401526020810190506105e0565b8381111561060a576000848401525b50505050565b6000600282049050600182168061062857607f821691505b6020821081141561063c5761063b610673565b5b50919050565b61064b826106d1565b810181811067ffffffffffffffff8211171561066a576106696106a2565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f830116905091905056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a26469706673582212202c200df30f04df9bafd76ab09ea27f670c31a939b33f7d40ebb5df54f1c4831764736f6c63430008030033",
      "linkReferences": {},
      "deployedLinkReferences": {}
    }; // copy the contract ABI here
    const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com');
    function contractInteraction() {
      const contractAddress = '0x2Bc7A39c22403dA3617b237D42BF0db2C5dcaBA1'
      const connectedContract = new ethers.Contract(contractAddress, Greeter.abi, provider);
      const txn = connectedContract.greet()
      txn.then(function(result) {
          alert(result)
      })
    }
    
    // const minimize_address = `${wallet?.slice(0, 6)}..${wallet?.slice(-4)}`; 

 return (
        <div className='landing__page__section'>
          {isOpen && (
           <>
            <div className="overlay"></div>
            <div className="modal">
              <button onClick={closeModal} className="close-button">&times;</button>
              <main className="modal__main">
                <img src={meta} alt="metamask logo"  onClick={btnhandler} style={{fontSize:'20px',height:'78px',marginTop:'20px',lineHeight:'5.4',}}/>
                <h1 style={{fontWeight:'900', fontSize:'60px', color:'white'}}>Metamask</h1>
                <p onClick={btnhandler} style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', fontWeight:'600',}}>Connect to your Metamask Wallet</p>
              </main>
              <main className="modal__main">
                <img src={sequence_logo} alt="metamask logo" onClick={connectWallet} style={{fontSize:'20px',height:'78px',marginTop:'20px',lineHeight:'5.4',}}/>
                <h1 style={{fontWeight:'900', fontSize:'60px', color:'white'}}>Sequence</h1>
                <p onClick={connectWallet} style={{color:'hsla(0,0%,100%,.5)', fontSize:'25px', fontWeight:'600',}}>Connect to your Sequence Wallet</p>
              </main>
            </div>
           </>
          )}
          {
            explore && (
          <>
            <div className="overlay"></div>
            <div className="explore_modal">
              <button onClick={() => setExplore(false)} className="close-button">&times;</button>
              <main className="explore__main">
                <p style={{fontWeight:'900', fontSize:'20px', color:'white'}}>Mint new Certificate</p>
                <p style={{fontWeight:'600', fontSize:'15px', color:'white', paddingTop:'20px',}}>Metadata</p>
                <hr style={{marginTop:'10px', width:'550px', color:'hsla(0,0%,100%,.5)', opacity:'0.05',}}/>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Name<span style={{color:'red'}}>*</span></p>
                <input type='text' className='explore__name' placeholder='Name of Certificate' required/>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Address<span style={{color:'red'}}>*</span></p>
                <input type='text' className='explore__name' placeholder='Add Receiver Address' required/>
                <p style={{fontWeight:'600', fontSize:'15px', color:'white', paddingTop:'20px',}}>Media</p>
                <div className='upload__section'>
                  <div className='upload__nav'>
                    <div><FiUpload style={{ paddingTop:'10px', fontSize:'30px', color:'hsla(0,0%,100%,.5)'}}/></div>
                    <div><p style={{fontWeight:'600', fontSize:'15px', color:'hsla(0,0%,100%,.5)',}}>Upload File</p></div>
                  </div>
                  <div>
                    <input type="file" ref={hiddenFileInput} style={{display:'none'}} required/>
                    <button className='upload__btn' onClick={handleClick} onChange={handleChange}> <span style={{paddingTop:'20px', color:'hsla(0,0%,100%,.5)'}}><AiOutlineFileAdd style={{paddingTop:'5px',}}/></span> Select File</button>
                  </div>
                </div>
                <p style={{fontSize:'12px', paddingTop:'10px' ,color:'hsla(0,0%,100%,.5)',}}>File Supported: PNG, JPG.</p>
                <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Description</p>
                <textarea className="description__field"  name="msg" rows="5" cols="50" required></textarea>
                <div className="properties__section">
                  <div className="properties__nav">
                    <p style={{fontWeight:'400', fontSize:'13px', color:'white', paddingTop:'20px',}}>Properties</p>
                    <button className='reset__btn'>Reset <span><MdOutlineFormatColorReset style={{paddingTop:'3px',}}/></span></button>
                  </div>
                  {
                    newrowinput.map((x, id) => {
                      return (
                      <>
                        <div className='property__line'>
                          <div> 
                             <input type='text' className='property__name' placeholder='trait_type' onChange={event => handleInputChange(event,id)} required/>
                          </div>
                          <div>
                            <input type='text' className='property__name' placeholder='value' onChange={event => handleInputChange(event,id)} required/>
                          </div>
                          <div><p onClick={() => removeRow(id)} style={{paddingTop:'5px', color:'hsla(0,0%,100%,.5)'}}>x</p></div>
                        </div>
                      </>
                      )
                    })
                  }
                  <button className='add__row__btn' onClick={addRow}>+ Add Row</button>
                  <button className='submit__btn'>Submit</button>
                </div>
              </main>
            </div>
          </>
            )
          }

          {
            signmodal && (
            <>
              <div className="overlay"></div>
              <div className='login__modal'>
               <button onClick={() => setSignModal(false)} className="close-button">&times;</button>
               <h1 className="sign__text">Sign Up</h1>
               <input type='text' placeholder='Name' className="name__field"/>
               <form class="my-form">
                  <textarea className="description-field"  name="msg" rows="5" cols="50" placeholder="Description"></textarea>
               </form>
               <button className="sign__btn">Sign Up</button>      
              </div>
            </>
            )
          }
          <div className='header-section'> 
              <div className='header__logo'>
                <span><img src={logo} style={{fontSize:'20px',height:'28px',marginTop:'20px',lineHeight:'2.4',}}alt="certaine-logo"/></span>
                <Link to="/" style={{textDecoration:'none', outline:'none',}}><h1 style={{color:'white', paddingTop:'20px', paddingLeft:'10px', cursor:'pointer'}} className='header-text'>Certaine</h1></Link>
              </div>
              <div>
                <button className='connect-button' onClick={openModal} style={{border:'1px solid transparent'}}>Connect Wallet</button>
                {/* <ToastContainer /> */}
              </div>
          </div>

           <div className='main__landing__section'>
              <div className='landing__text'>
                  <h1 className='head__txt' style={{color:'white', fontSize:'60px', width:'70%',}}>Upload & Build NFT Certificate Easily</h1>
                  <p className='descrp__txt' style={{color:'hsla(0,0%,100%,.5)', width:'70%',}}>It takes seconds to upload certificate and create an NFT certificate on Certaine. Easily Connect your Wallet. Send NFT to any address.</p>
                  <div>
                    <button className='new__button' onClick={() => setSignModal(true)} style={{marginTop:'20px', border:'1px solid transparent'}}>New to Certaine</button>
                    <button onClick={() => setExplore(true)} className='sign-button' style={{marginTop:'20px', width:'8rem', marginLeft:'4rem', border:'1px solid transparent'}}>Explore</button>
                  </div>
                  <button onClick={contractInteraction}>Test Smart Contract</button>
              </div>
           </div>
        </div>
    )
}


export default Landing;