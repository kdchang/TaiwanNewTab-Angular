'use strict';

var app = angular.module('myApp', []);

app.run(function($window, $rootScope) {
    $rootScope.online = navigator.onLine;
    if($rootScope.online) {
    	$rootScope.onlineStatus = '已連線';
    } else {
    	$rootScope.onlineStatus = '未連線';
    }
    $window.addEventListener("offline", function() {
        $rootScope.$apply(function() {
            $rootScope.online = false;
	    	$rootScope.onlineStatus = '未連線';
        });
    }, false);
    $window.addEventListener("online", function() {
        $rootScope.$apply(function() {
            $rootScope.online = true;
	    	$rootScope.onlineStatus = '已連線';
        });
    }, false);   
});

app.controller('MainCtrl', ['$rootScope', '$scope', '$http', '$timeout', 'imageService', function($rootScope, $scope, $http, $timeout, imageService) {
    $scope.clock = "loading clock..."; // initialise the time variable
    $scope.tickInterval = 1000 //ms

    var tick = function() {
            $scope.clock = Date.now() // get the current time
            $timeout(tick, $scope.tickInterval); // reset the timer
        }
        // Start the timer
    $timeout(tick, $scope.tickInterval);

    $scope.images = imageService.getImages()
    if($rootScope.online) {
	    $scope.image = $scope.images[Math.floor(Math.random() * $scope.images.length)];
    } else {
	    $scope.image = $scope.images[Math.floor(Math.random() * 5)];    
    }

    $rootScope.setBackground = function() {
        return {
            'background-image': $scope.image.path
        }
    }

    $scope.toogleSearch = function() {
    	$scope.showSearch = !$scope.showSearch;
    }
}])

app.factory('imageService', ['$rootScope', function($rootScope) {
    var images = [{
        name: '合歡山',
        link: 'https://www.flickr.com/photos/67415843@N05/23288635480/in/photolist-BtWkXW-pC6LSd-ARTDqF-oMXpmo-b5hQEH-bmYWtc-bwDFm9-bkjtjs-ocEPNj-dmNuR2-xYA8n4-BpBidt-ALFRtW-Dnr1h-DnpTd-z7fLs-dXYgBz-DnqVy-DnqGk-nHdSWc-ypmuo-DnqUN-DnpD9-Dnqug-Dnqeu-DnqNZ-znU8b-pgrP5X-DnpBj-Dnpod-DnqCs-DnqPQ-Dnqwx-Btwf4D-BNwxMy-ie6Ws9-bqyUMi-newJUv-Dnqpj-nakbGD-BBKvup-AJaKgH-rrnUS1-DnqMU-yLVyi-aiKwZo-qEZHUq-ocyZuA-s39aPJ-Dnr5m',
        path: 'url(../images/photos/hehuanshan.jpg)',
    }, {
        name: '台北101',
        link: 'https://www.flickr.com/photos/127339305@N05/22793324515/in/photolist-AJaKgH-aSh7d4-pXTjcm-pXvAGQ-tU9TXZ-nDsekN-wwtqXV-sXjKbZ-b5hQEH-bmYWtc-bwDFm9-yzzZHa-m5RqEo-wM3oTR-pZYvHz-m5PPxT-yx2wSt-ocyZuA-BDNR4E-bbECy2-BrzCYK-4PkfTi-aHrEiv-aRjsLz-x1zW4i-qSLbap-dtgCNN-bDummV-yKhSPE-wvdPRt-wcbG5G-vaWunw-nmQ7Z6-yfQuz9-pXTwbG-oSU8cR-p1vvEG-w7jc8m-yhZb7L-x8NRd7-xtWaNa-4wKJCe-oaBAaZ-4XU8Xk-dPXLeK-96EnLg-8DyFKT-b7Jtnk-ro1DYG-brASqW',
        path: 'url(../images/photos/101.jpg)',
    }, {
        name: '圓山飯店',
        link: 'https://www.flickr.com/photos/seeminglee/14571905402/in/photolist-ocEPNj-xYA8n4-nHdSWc-BNwxMy-newJUv-nakbGD-AJaKgH-aSh7d4-pXTjcm-pXvAGQ-tU9TXZ-nDsekN-wwtqXV-sXjKbZ-b5hQEH-bmYWtc-bwDFm9-yzzZHa-m5RqEo-wM3oTR-pZYvHz-m5PPxT-yx2wSt-ocyZuA-BDNR4E-bbECy2-BrzCYK-4PkfTi-aHrEiv-aRjsLz-x1zW4i-qSLbap-dtgCNN-bDummV-yKhSPE-wvdPRt-wcbG5G-vaWunw-nmQ7Z6-yfQuz9-pXTwbG-oSU8cR-p1vvEG-w7jc8m-yhZb7L-x8NRd7-xtWaNa-4wKJCe-oaBAaZ-4XU8Xk',
        path: 'url(../images/photos/grand_hotel.jpg)',
    }, {
        name: '自由廣場',
        link: 'https://www.flickr.com/photos/seeminglee/14570767342/in/photolist-ocyZuA-BDNR4E-bbECy2-BrzCYK-4PkfTi-aHrEiv-aRjsLz-x1zW4i-qSLbap-dtgCNN-bDummV-yKhSPE-wvdPRt-wcbG5G-vaWunw-nmQ7Z6-yfQuz9-pXTwbG-oSU8cR-p1vvEG-w7jc8m-yhZb7L-x8NRd7-xtWaNa-4wKJCe-oaBAaZ-4XU8Xk-dPXLeK-96EnLg-8DyFKT-b7Jtnk-ro1DYG-brASqW-tWUpXh-o7ZDcf-rwZq3x-Jprw5-nSFk6s-tPEGk-bCo6jK-BGtXXu-AKhq4D-pwEKFn-wt8dbE-CvbovS-vggczh-m5Qxqt-o35Dms-qesUjG-w6ieWP',
        path: 'url(../images/photos/freedom.jpg)',
    }, {
        name: '台灣工程師',
        link: 'https://www.flickr.com/photos/toomore/23066277453/in/photolist-B9hGER-BMTo39-BMTnQq-c7dAdC-Brt2gY-CgFUNv-AA4qwm-Cozf6D-ob1hQt-BJk9XQ-BNbdAv-B8XfeH-4XYoSb-BcsNio-BN1FK8-BgLv43-CULGFs-q54QGr-dHrg2n-AE5MdM-CgVvSX-AQjfwW-yPJoho-pmWt1F-aQN8KP-BS58y4-BFGCyv-yBvH8j-BGS9ij-pe1up5-CMq5cX-5289Xy-C7kJcA-BFGBW8-B5zeTv-BKSfgo-BnUeNe-CHwKdq-wdBhJQ-ouv3zq-BjV8dc-AwNvJ-nzjfiS-D7FG6-A8WER8-wt7zMs-y2vRpw-B1H9NT-A8Wf1X-Aqv9Yf',
        path: 'url(../images/photos/engineer.jpg)',
    }, {
        name: '燕子口',
        link: 'https://www.flickr.com/photos/pslee999/20353680351/in/photolist-x1zW4i-w7jc8m-x8NRd7-qSLbap-dtgCNN-xtWaNa-bDummV-yKhSPE-4wKJCe-pwEKFn-wt8dbE-CvbovS-vggczh-m5Qxqt-4XU8Xk-96EnLg-b7Jtnk-w6ieWP-nVKJ33-zqdcy1-o7ZDcf-y2wPjA-C3VZrk-p4fuaF-wrucU1-o7ALS2-z843BE-z83yGb-zVHUb2-nSFk6s-zhMPJS-tPEGk-AeDq2k-AjY9vW-bCo6jK-BGtXXu-oaBAaZ-dPXLeK-o35Dms-qesUjG-8DyFKT-qmrSWj-ro1DYG-brASqW-xX4dqE-oCV4ky-tWUpXh-rwZq3x-BNwxnL-u1oE3E',
        path: 'url(../images/photos/swallow.jpg)',
    }, {
        name: '九份',
        link: 'https://www.flickr.com/photos/jerrylai0208/11028191523/in/photolist-hNwn8a-oe73K-oe74F-bEsv61-oedzt-fzyCsn-oe778-r1bt6M-r1dvsX-rErRgY-7jD3Z1-rUGXzb-rEq583-5C5xb7-oAyxbs-qP2M7G-rtzfDa-rrGNRn-rL2pe4-qPeG9R-qP2Afm-rtrzW3-rKWgoa-rKV2Ro-rtzf2D-rKWfXF-qP2zsE-rKV2cY-rrGMYv-rtzetp-rKV24G-rtryQq-rrGMzV-rrGMqM-qPeEqF-rtsMjo-qP2yDq-qPeE4Z-rKWeyi-qP2ydL-rL2odr-rL2oaF-rKUZSy-bTnfGP-bEsvXm-rL2o1x-rtzcJn-rHJEx7-qPeDiR-rtrxcW',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/nigh.jpg)',
    }, {
        name: '陽明山',
        link: 'https://www.flickr.com/photos/alexyo1968/5019585053/in/photolist-8DyFKT-b7Jtnk-w6ieWP-qmrSWj-ro1DYG-brASqW-nVKJ33-tWUpXh-o7ZDcf-y2wPjA-rwZq3x-BNwxnL-C3VZrk-z48kBw-Jprw5-o7ALS2-BTebkn-AU3q2Z-nSFk6s-tPEGk-by9F53-AjY9vW-BGtXXu-pwEKFn-CvbovS-vggczh-m5Qxqt-o35Dms-qesUjG-xX4dqE-zqdcy1-oCV4ky-u1oE3E-p4fuaF-BzLCrA-xqn2LR-wrucU1-xYAgRD-z843BE-zVHUb2-zhMPJS-AeDq2k-xExcMq-bCo6jK-AKhq4D-8YNGPu-ocvT1Z-8V1ivY-AzgYFS-CCrsGy',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/YangMingShan.jpg)',
    }, {
        name: '蘭嶼',
        link: 'https://www.flickr.com/photos/hsuyo/14738669341/in/photolist-ospwUD-m5RqEo-nakbGD-BBKvup-eRziNQ-rrnUS1-DnqMU-wM3oTR-yLVyi-pZYvHz-aSh7d4-m5PPxT-aiKwZo-yx2wSt-ybteLP-qEZHUq-ocyZuA-bBowGn-wvdPRt-Dnr5m-wcbG5G-bbECy2-P835Q-DnqM3-BrzCYK-xNgn2t-DnqJL-vaWunw-4PkfTi-nmQ7Z6-2rQzZr-aHrEiv-55vnNX-DnqnY-xHyaoq-z83yGb-yfQuz9-pXTwbG-Dnq3t-oSU8cR-y6JmC-AJaKgH-iYFw5U-BDNR4E-s39aPJ-rsuNpi-xRpnmF-qEZHVC-z7vKhj-p1vvEG',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Lanyu.jpg)',
    }, {
        name: '龜山島',
        link: 'https://www.flickr.com/photos/pslee999/18932305080/in/photolist-uQZ1H7-oaBAaZ-vggczh-m5Qxqt-4XU8Xk-zv7N5-zwQTPR-DnqWq-d3rXQC-dPXLeK-AYnpc3-o35Dms-qesUjG-DnqXa-qVjneH-4EoqwU-4JjTFy-c3tcz3-6CZvGE-qUYY6i-z6deA-pXqYnm-96EnLg-A9BUiB-CFqLLZ-r6JRZm-CD1d6t-b7Jtnk-yUMcBV-w6ieWP-zmFdo-qmrSWj-ro1DYG-CAtVay-brASqW-nVKJ33-xX4dqE-BZ6dsp-zqdcy1-qPgoHa-ALYfZb-oCV4ky-bBaX2r-tWUpXh-6qx6QA-s93RuU-yjTkc-DnpwE-Dnpqc-o7ZDcf',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Turtle.jpg)',
    }, {
        name: '馬祖',
        link: 'https://www.flickr.com/photos/rayofsun/13801890213/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Matsu.jpg)',
    }, {
        name: '淡水',
        link: 'https://www.flickr.com/photos/78291705@N07/15919270647/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Tanshui.jpg)',
    }, {
        name: '台北市景',
        link: 'https://www.flickr.com/photos/i-gunawan/23494318805/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Taipei.jpg)',
    }, {
        name: '高雄愛河之心',
        link: 'https://www.flickr.com/photos/vicjuan/14975673040/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/heart.jpg)',
    }, {
        name: '西子灣英國領事館',
        link: 'https://www.flickr.com/photos/colortec/9816656263/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/cwan.jpg)',
    }, {
        name: '和平島',
        link: 'https://www.flickr.com/photos/lonmain/4679589830/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/peace.jpg)',
    }, {
        name: '高雄旗津渡輪',
        link: 'https://www.flickr.com/photos/colortec/12654025843/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/port.jpg)',
    }, {
        name: '高速公路',
        link: 'https://www.flickr.com/photos/xhowardlee/23760461302/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/Highway.jpg)',
    }, {
        name: '澎湖燈塔',
        link: 'https://www.flickr.com/photos/pslee999/20906127531/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/LightHouse.jpg)',
    }, {
        name: '烏來',
        link: 'https://www.flickr.com/photos/m-louis/16201535058/',
        path: 'url(https://raw.githubusercontent.com/kdchang/TaiwanNewTab/master/photos/wuri.jpg)',
    }];

    return {
        getImages: function() {
            return images;
        }
    }
}])
