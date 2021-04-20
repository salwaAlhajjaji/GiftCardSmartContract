pragma solidity >=0.6.0 <0.8.4;
pragma abicoder v2;

contract GiftCard{
    
   string private _symbol;
   string private  _name;
    address private owner;

   constructor() public{
       owner = msg.sender;
        _name = "Bravo";
        _symbol = "BRV";
    }
    
    struct Card {
        uint value;
        uint issueDate;
        uint ExpireDate;
        uint cardId;
        address generatedBy;
    }
    
    struct reward {
        uint points;
        uint issueDate;
        uint ExpireDate;
    }
    
    
    uint _cardId;
    mapping (address => Card) public cards;
    mapping (address => reward) public rewards;
    mapping (uint256 => mapping(address => uint256)) private _balances;
    mapping (address => uint) public _balances2;
    

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view  returns (string memory) {
        return _symbol;
    }

    modifier onlyOwner (uint _cardIdd) {
        require(_cardId == cards[msg.sender].cardId, "you are not the Owner" );
      _;
     }
    modifier notNull(address _address) {
        require(_address != address(0),"The address is Empty");
        _;
    }
    modifier exist(uint _cardIdd) {
        require(cards[msg.sender].cardId ==  _cardIdd ,"The card ID does Not Exist");
        _;
    }
    modifier expire() {
        require(cards[msg.sender].ExpireDate > block.timestamp ,"The card is Expire");
        _;
    }
    
        function GiftCardbBuyFee() public payable {
        require(msg.value> 0 , "The amount should be greater than 0" );        
        payable(owner).transfer(msg.value);
        issueGiftCard(msg.sender, msg.value);
        
    }
    
    function issueGiftCard(address _beneficiary,uint _value) private {
        Card memory newCard = Card (_value, block.timestamp, block.timestamp + 365 days, _cardId, _beneficiary);
        cards[msg.sender] = newCard;
        _mint(_beneficiary, _cardId, _value, "");
        reward memory newReward= reward(_value*1/100,block.timestamp, block.timestamp + 500 days);
        rewards[_beneficiary] = newReward;
        _cardId++;
    }
    
    // function transferGiftCardTo(address _newBeneficiary) public exist(cards[msg.sender].cardId) onlyOwner (cards[msg.sender].cardId) notNull(_newBeneficiary) expire() {
    function transferGiftCardTo(address _newBeneficiary) public {
         safeTransferFrom (msg.sender, _newBeneficiary, cards[msg.sender].cardId, cards[msg.sender].value,"");
         cards[_newBeneficiary] = cards[msg.sender];
         delete cards[msg.sender];
    }
     
    // function GiftCardAddFee(uint _amount) public payable exist(cards[msg.sender].cardId) onlyOwner(cards[msg.sender].cardId) expire(){
    function GiftCardAddFee(uint _amount) public payable {
        require(_amount == msg.value, "Check your balance");
        addFundsToGiftCard(_amount);
    }
    
    function addFundsToGiftCard(uint _amount) private {
         cards[msg.sender].value+=_amount;
         _mint(msg.sender, cards[msg.sender].cardId, _amount, "");
         rewards[msg.sender].points=_amount*1/100;
    }
    
    // function withdrawMerchantBalance(uint _amount ) public exist(cards[msg.sender].cardId) onlyOwner (cards[msg.sender].cardId) expire() {
    function withdrawMerchantBalance(uint _amount ) public {
        require(_amount <=  cards[msg.sender].value, "Check your balance");
        cards[msg.sender].value-=_amount;
        _burn(msg.sender, cards[msg.sender].cardId, _amount);
    }
     
    function Redeem() public onlyOwner(cards[msg.sender].cardId) {
        uint limit=5;
        if (rewards[msg.sender].points >= limit){
        issueRewards(1);
          }
    }
      
    function issueRewards(uint _value) private  {
        Card memory newCard = Card (_value, block.timestamp, block.timestamp + 365 days, _cardId, msg.sender);
        cards[msg.sender] = newCard;
        _mint(msg.sender, _cardId, _value, "");
        //after redeem the points will be reset
        rewards[msg.sender].points =0;
        cards[msg.sender].value+=_value;
        _mint(msg.sender, cards[msg.sender].cardId, _value, "");
    }
    
    /////////****ERC1155 & ERC20 Functions****/////////
    
    event TransferSingle(address indexed operator, address indexed from, address indexed to, uint256 id, uint256 value);
    mapping (address => mapping(address => bool)) private _operatorApprovals;

    function _mint(address account, uint256 id, uint256 amount, bytes memory data) internal  {
        require(account != address(0), "ERC1155: mint to the zero address");
        address operator = msg.sender;
        _beforeTokenTransfer(operator, address(0), account, _asSingletonArray(id), _asSingletonArray(amount), data);
        _balances[id][account] += amount;
        _balances2[account] += amount;
        emit TransferSingle(operator, address(0), account, id, amount);
    }
    
    function safeTransferFrom(address from, address to, uint256 id, uint256 amount, bytes memory data) public {
        require(to != address(0), "ERC1155: transfer to the zero address");
        require(from == msg.sender || isApprovedForAll(from, msg.sender),"ERC1155: caller is not owner nor approved");
        address operator = msg.sender;
        _beforeTokenTransfer(operator, from, to, _asSingletonArray(id), _asSingletonArray(amount), data);
        uint256 fromBalance = _balances[id][from];
        require(fromBalance >= amount, "ERC1155: insufficient balance for transfer");
        _balances[id][from] = fromBalance - amount;
        _balances[id][to] += amount;
        uint256 fromBalance2 = _balances2[from];
        _balances2[from] = fromBalance2 - amount;
        _balances2[to] += amount;
        emit TransferSingle(operator, from, to, id, amount);
    }
    
    function _burn(address account, uint256 id, uint256 amount) internal {
        require(account != address(0), "ERC1155: burn from the zero address");
        address operator = msg.sender;
        _beforeTokenTransfer(operator, account, address(0), _asSingletonArray(id), _asSingletonArray(amount), "");
        uint256 accountBalance = _balances[id][account];
        require(accountBalance >= amount, "ERC1155: burn amount exceeds balance");
        _balances[id][account] = accountBalance - amount;
        uint256 accountBalance2 = _balances2[account];
        _balances2[account] = accountBalance2 - amount;
        emit TransferSingle(operator, account, address(0), id, amount);
    }
    
    function _beforeTokenTransfer(address operator, address from, address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) internal{ 
    }
        
    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;
        return array;
    }
    
    function isApprovedForAll(address account, address operator) public view returns (bool) {
        return _operatorApprovals[account][operator];
    }
    // /////
      function balanceOf(address account) public view returns (uint256) {
        return _balances2[account];
    }
      function balanceOf(address account, uint256 id) public view  returns (uint256) {
        require(account != address(0), "ERC1155: balance query for the zero address");
        return _balances[id][account];
    }


     
}