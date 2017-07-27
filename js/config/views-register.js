// ------------------------------------------------------------------------
// Views registry
//
var Views = {
	tmpl: {
		/********pageHome**********/

		index: 'views/tmpl/pageHome/index.html:首页:#f7f7f7',


		/********我的mine**********/
		indexMine: 'views/tmpl/mine/mineIndex.html:我的:#f7f7f7',
		setUp: 'views/tmpl/mine/setUp.html:设置:#f7f7f7',
		accountSecurity: 'views/tmpl/mine/accountSecurity.html:账户安全:#f7f7f7',
		addressManagement:'views/tmpl/mine/addressManagement.html:收货地址管理:#f7f7f7',
		changeAddress:'views/tmpl/mine/changeAddress.html:修改收货地址:#f7f7f7',
		addedAddress:'views/tmpl/mine/addedAddress.html:新增收货地址:#f7f7f7',
		authentication:'views/tmpl/mine/authentication.html:身份验证:#f7f7f7',
		mailbox:'views/tmpl/mine/mailbox.html:邮箱:#f7f7f7',
		mailBridging:'views/tmpl/mine/bridging.html:更换邮箱:#f7f7f7',
		addmailBridging:'views/tmpl/mine/addbridging.html:绑定邮箱:#f7f7f7',
		verificationCode:'views/tmpl/mine/verificationCode.html:更换邮箱:#f7f7f7',
		mobileNumber:'views/tmpl/mine/mobileNumber.html:手机管理:#f7f7f7',
		phoneBridging:'views/tmpl/mine/bridgingT.html:更换手机号:#f7f7f7',
		addphoneBridging:'views/tmpl/mine/addbridgingT.html:绑定手机号:#f7f7f7',
		area:'views/tmpl/mine/area.html:选着地区:#f7f7f7',
		verificationCodeT:'views/tmpl/mine/verificationCodeT.html:选着地区:#f7f7f7',

		paymentSettings:'views/tmpl/mine/paymentSettings.html:支付设置:#f7f7f7',
		passwordReset:'views/tmpl/mine/passwordReset.html:密码重置:#f7f7f7',
		case:'views/tmpl/mine/case.html:分享测试:#f7f7f7',

		resetLogin:'views/tmpl/mine/resetLogin.html:重置登录密码:#f7f7f7',
		verificationCodeTT:'views/tmpl/mine/verificationCodeTT.html:重置密码验证:#f7f7f7',
		fillinNewPassword:'views/tmpl/mine/fillinNewPassword.html:填写新密码:#f7f7f7',
		remember:'views/tmpl/mine/remember.html:重置密码(记得):#f7f7f7',

		resetPay:'views/tmpl/mine/resetPay.html:重置支付密码:#f7f7f7',
		verificationCodeTa:'views/tmpl/mine/verificationCodeTa.html:忘记密码:#f7f7f7',
		fillinNewPasswordTa:'views/tmpl/mine/fillinNewPasswordTa.html:忘记密码(下一步):#f7f7f7',
		rememberTa:'views/tmpl/mine/rememberTa.html:重置支付密码(记得):#f7f7f7',

		messageNotification:'views/tmpl/mine/messageNotification.html:新消息提示:#f7f7f7',
		privacy:'views/tmpl/mine/privacy.html:隐私:#f7f7f7',
		general:'views/tmpl/mine/general.html:通用:#f7f7f7',
		multilingual:'views/tmpl/mine/multilingual.html:多种语言:#f7f7f7',

		aboutT:'views/tmpl/mine/about.html:关于:#f7f7f7',
		feedbackT:'views/tmpl/mine/feedback.html:意见反馈:#f7f7f7',

		personalCenter:'views/tmpl/mine/personalCenter.html:个人中心:#f7f7f7',
        personalData:'views/tmpl/mine/personalData.html:个人资料:#f7f7f7',
		myBankCard:'views/tmpl/mine/myBankCard.html:我的银行卡:#f7f7f7',
		addBankCard:'views/tmpl/mine/addBankCard.html:添加银行卡:#f7f7f7',
		xgBankCard:'views/tmpl/mine/xgBankCard.html:修改银行卡:#f7f7f7',
		fillBankCardInformation:'views/tmpl/mine/fillBankCardInformation.html:填写银行卡信息:#f7f7f7',

		myCircleOfFriends:'views/tmpl/mine/myCircleOfFriends.html:我的朋友圈:#f7f7f7',

		myShareCommodity:'views/tmpl/mine/myShareCommodity.html:我的分享商品:#f7f7f7',
		myCollection:'views/tmpl/mine/myCollection.html:我的收藏:#f7f7f7',

		mySuperior:'views/tmpl/mine/mySuperior.html:我的上级:#f7f7f7',
        dpsf:'views/tmpl/mine/dpsf.html:店铺身份:#f7f7f7',
		billingDetailsA:'views/tmpl/mine/billingDetails.html:我的账单详情:#fff',
		XXbillingDetailsA:'views/tmpl/mine/billingDetails.html:消息通知详情:#fff',

		myWallet:'views/tmpl/mine/myWallet.html:我的钱包:#f7f7f7',
        detailed:'views/tmpl/mine/detailed.html:明细:#fff',

		withdraw:'views/tmpl/mine/withdraw.html:提现:#f7f7f7',
		selectBankCard:'views/tmpl/mine/selectBankCard.html:银行卡选着:#f7f7f7',
		wantToRecharge:'views/tmpl/mine/wantToRecharge.html:我要充值:#f7f7f7',

		myImazamox:'views/tmpl/mine/myImazamox.html:我的金豆:#f7f7f7',
		exchange:'views/tmpl/mine/exchange.html:兑换金豆:#f7f7f7',
		exchangeRecord:'views/tmpl/mine/exchangeRecord.html:兑换记录:#f7f7f7',

		shoppingCart:'views/tmpl/mine/shoppingCart.html:购物车:#f7f7f7',
		myOrder:'views/tmpl/mine/myOrder.html:我的订单:#f7f7f7',
		pendingPaymentDetails:'views/tmpl/mine/pendingPaymentDetails.html:代付款-详情:#f7f7f7',
		successOrder:'views/tmpl/mine/successOrder.html:确认订单:#f7f7f7',
		toBeShippedDetails:'views/tmpl/mine/toBeShippedDetails.html:代发货:#f7f7f7',
		pendingReceiptDetails:'views/tmpl/mine/pendingReceiptDetails.html:代收货:#f7f7f7',
		detailsToBeEvaluated:'views/tmpl/mine/detailsToBeEvaluated.html:代评价:#f7f7f7',
		salePage:'views/tmpl/mine/salePage.html:退款/售后:#f7f7f7',
		evaluation:'views/tmpl/mine/evaluation.html:发表评价:#f7f7f7',
		viewLogistics:'views/tmpl/mine/viewLogistics.html:查看物流:#f7f7f7',
		viewLogisticss:'views/tmpl/mine/viewLogistics.html:查看物流消息通知:#f7f7f7',


		personalStore:'views/tmpl/mine/personalStore.html:我的店铺:#f7f7f7',
		storeDistribution:'views/tmpl/mine/storeDistribution.html:店铺分销:#f7f7f7',

		myBill:'views/tmpl/mine/myBill.html:我的账单:#fff',

		storeDetails:'views/tmpl/mine/storeDetails.html:店铺详情:#f7f7f7',
		shopIntroduction:'views/tmpl/mine/shopIntroduction.html:店铺介绍:#f7f7f7',
        sweepTheFace:'views/tmpl/mine/sweepTheFace.html:当面扫码:#f7f7f7',
        partake:'views/tmpl/mine/partake.html:长图分享:#f7f7f7',
		customerService:'views/tmpl/mine/customerService.html:客服:#f7f7f7',

		/********消息news*************/
		information: 'views/tmpl/news/information.html:消息:#f7f7f7',
		logisticsMessage:'views/tmpl/news/logisticsMessage.html:消息:#f7f7f7',

		/********搜索 seach*************/
		searchShop: 'views/tmpl/seach/searchShop.html:我的:#f7f7f7',
		rakeThrough: 'views/tmpl/seach/rakeThrough.html:搜索页:#f7f7f7',
		sCommodityList:'views/tmpl/seach/commodityList.html:我的:#f7f7f7',

		/********自营 dealer *************/


		sweepCodeHome:'views/tmpl/dealer/payment/sweepCodeHome.html:扫码付首页:#f7f7f7',
		sweepCode: 'views/tmpl/dealer/payment/sweepCode.html:扫码付:#f7f7f7',
		selectorChannel:'views/tmpl/dealer/payment/selectorChannel.html:选择通道:#f7f7f7',
        collectionCode:'views/tmpl/dealer/payment/collectionCode.html:收款二维码:#f7f7f7',
        payment:'views/tmpl/dealer/payment/payment.html:付款二维码:#f7f7f7',
        gathering:'views/tmpl/dealer/payment/gathering.html:收款理由:#f7f7f7',

		personalStores:'views/tmpl/dealer/payment/personalStores.html:我的店铺:#f7f7f7',

		accountBalance:'views/tmpl/dealer/payment/accountBalance.html:账户余额:#f7f7f7',
		billingDetails:'views/tmpl/dealer/payment/billingDetails.html:账单详情:#fff',
		receiveDividents:'views/tmpl/dealer/payment/receiveDividents.html:分红:#f7f7f7',
		immediateWithdrawal:'views/tmpl/dealer/payment/immediateWithdrawal.html:我要提现:#f7f7f7',
		incomeDetails:'views/tmpl/dealer/payment/incomeDetails.html:分红明细:#f7f7f7',

		raiseList: 'views/tmpl/dealer/raise/raiseList.html:众筹捐款:#f7f7f7',
		raiseComplete: 'views/tmpl/dealer/raise/raiseComplete.html:筹集完成:#fff',
		charityGoods: 'views/tmpl/dealer/raise/charityGoods.html:公益产品:#f7f7f7',
		oneOnOne: 'views/tmpl/dealer/raise/oneOnOne.html:一对一助学:#fff',
		oneOnOneDetails: 'views/tmpl/dealer/raise/oneOnOneDetails.html:一对一助学详情:#ffffff',

		raiseListMine: 'views/tmpl/dealer/raise/mine.html:我的:#f7f7f7',

		myDonation: 'views/tmpl/dealer/raise/myDonation.html:我的捐赠:#f7f7f7',
		myShare: 'views/tmpl/dealer/raise/myShare.html:我的分享:#f7f7f7',
		feedbackO: 'views/tmpl/dealer/raise/feedback.html:意见反馈:#fff',

		/********电话tel**********/
		telephone: 'views/tmpl/tel/telephone.html:我的:#fff',
		dial: 'views/tmpl/tel/dial.html:我的:#f7f7f7',
		recharge:'views/tmpl/tel/recharge.html:我的:#f7f7f7',
		mineDial:'views/tmpl/tel/mine.html:我的:#f7f7f7',
		myAccount:'views/tmpl/tel/myAccount.html:我的:#f7f7f7',
		callLog:'views/tmpl/tel/callLog.html:我的:#f7f7f7',
		telephoneSet:'views/tmpl/tel/telephoneSet.html:我的:#f7f7f7',
		dialSet:'views/tmpl/tel/dialSet.html:我的:#f7f7f7',
		oneKeySet:'views/tmpl/tel/oneKeySet.html:我的:#f7f7f7',
		about:'views/tmpl/tel/about.html:我的:#f7f7f7',
		contacts:'views/tmpl/tel/contacts.html:我的:#f7f7f7',
		addContact:'views/tmpl/tel/addContact.html:添加联系人:#f7f7f7',



		/********登录 注册************/
		signIn:'views/tmpl/login/SignIn.html:登录:#fff',
		register:'views/tmpl/login/register.html:注册:#fff',
		forgotPassword:'views/tmpl/login/forgotPassword.html:忘记密码:#fff',
		fenxiang:'views/tmpl/login/fenxiang.html:分享:#fff',


		/********个人美妆*************/
		classification:'views/tmpl/classification/classification.html:我的:#f7f7f7',
		commodityDetails:'views/tmpl/classification/commodityDetails.html:商品详情:#f7f7f7',
        commodityEvaluation:'views/tmpl/classification/commodityEvaluation.html:商品详情:#f7f7f7',
		becomeDetails:'views/tmpl/classification/becomeDetails.html:购买身份/补货:#f7f7f7',

		commodityList:'views/tmpl/classification/commodityList.html:商品列表:#f7f7f7',

		/********充值*************/
		voucherCenter:'views/tmpl/recharge/voucherCenter.html:手机充值:#f7f7f7',
		chargeFlow:'views/tmpl/recharge/chargeFlow.html:流量充值:#f7f7f7',
		czjl:'views/tmpl/recharge/czjl.html:充值记录:#f7f7f7',
		refuelingCard:'views/tmpl/recharge/refuelingCard.html:加油卡:#f7f7f7',
		refuelingCardDetails:'views/tmpl/recharge/refuelingCardDetails.html:加油卡详情:#f7f7f7',
		entertainmentRecharge:'views/tmpl/recharge/entertainmentRecharge.html:影视充值:#f7f7f7',
		videoRechargeDetails:'views/tmpl/recharge/videoRechargeDetails.html:影视充值:#ffffff',
		activationCode:'views/tmpl/recharge/activationCode.html:激活码充值:#f7f7f7',

        /********磁疗贴  花想容等 千人千面  路由存放位置*************/
        hxmine:'views/tmpl/hxr/hxmySuperior.html:会员信息:#f7f7f7',
        myTj:'views/tmpl/hxr/myTjSuperior.html:我的推荐人:#f7f7f7',
        myhxCircleOfFriends:'views/tmpl/hxr/myhxCircleOfFriends.html:我邀请的人:#f7f7f7',
        myhxBill:'views/tmpl/hxr/myhxBill.html:我的分佣:#fff',
        myhxzdBill:'views/tmpl/hxr/myhxzdBill.html:我的账单:#fff',
        exhxchangeRecord:'views/tmpl/hxr/exhxchangeRecord.html:积分来源:#f7f7f7',
        myhxWallet:'views/tmpl/hxr/myhxWallet.html:我的钱包:#f7f7f7',
        hxaccountBalance:'views/tmpl/hxr/hxaccountBalance.html:账户余额:#f7f7f7',
        /********磁疗贴  花想容等 千人千面  路由存放位置结束*************/



		test: 'views/tmpl/test.html:页面一:#fff',
		test2: 'views/tmpl/test2.html:页面二:#fff',
		test3: 'views/tmpl/test3.html:页面3:#fff',
		listTest: 'views/tmpl/listTest.html:测试列表分页:#fff',
		listTestItem: 'views/tmpl/listTestItem.html:测试列表Item:#fff',
		upImgTest: 'views/tmpl/upImgTest.html:上传图片控件:#fff',
		
	},
	initTmpl: 'myOrder',//启动页的配置
	initData: {list: ['文艺1', '博客2', '摄影3', '电影4', '民谣5', '旅行6', '吉他7']},//启动页的初始化数据，一般不需要测试用
	errMsg: {
		NETWORK_ERROR: '网络繁忙，请稍后重试:-(',
		LOGIN_NO_USERNAME: '请输入手机号',
		LOGIN_NO_PASSWORD: '请输入密码',
		SESSION_TIMEOUT: '您的登录已过期！'
	}
};