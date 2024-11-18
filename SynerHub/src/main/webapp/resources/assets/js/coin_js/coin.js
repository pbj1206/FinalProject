var coinRefreshBtn;

var coinPage;

var pdList = [];

var coinRefreshAutoChecker;

var coinInterval;

const coinCaller = async () => {

}

const coinListGetter = async () => {
  coinPage = 1;
  coinRefreshBtn = MAIN_CONTENTS.querySelector('#coinRefreshBtn');

  // coinRefreshAutoChecker = MAIN_CONTENTS.querySelector('#autoRefresh')

  coinRefreshBtn.addEventListener('click', () => {
    coinListGetter();
  });

  // coinRefreshAutoChecker.addEventListener('click', function(){
  //   if(this.checked) {
  //     coinInterval = setInterval(coinListGetter, 10000);
  //   } else {
  //     clearInterval(coinInterval);
  //     coinInterval = null;
  //   }
  // })
  if(MAIN_CONTENTS.querySelector('#coinTable')) {
    let res = await axios.get("/synerhub/coin/list", axiosHeaderJson);
    pdList = res.data.data
    coinListRender();
  } else {
    return;
  }
}


const coinListRender = () => {
  coinRefreshBtn = MAIN_CONTENTS.querySelector('#coinRefreshBtn');
  let theads = MAIN_CONTENTS.querySelectorAll('#coinTableHead');
  let tbody1 = MAIN_CONTENTS.querySelector('#coinTableBody1st');
  let tbody2 = MAIN_CONTENTS.querySelector('#coinTableBody2nd');
  let tbody3 = MAIN_CONTENTS.querySelector('#coinTableBody3rd');
  let tbody4 = MAIN_CONTENTS.querySelector('#coinTableBody4th');
  let tbody5 = MAIN_CONTENTS.querySelector('#coinTableBody5th');

  theads.forEach(thead => {
    thead.innerHTML = `
      <tr>
        <th class="text-center w-30 text-truncate"> 
          코인
        </th>
        <th class="text-center w-40">
          가격
        </th>
        <th class="text-center w-30">
          변동률
        </th>
      </tr>
    `;
  });

  tbody1.innerHTML = "";
  tbody2.innerHTML = "";
  tbody3.innerHTML = "";
  tbody4.innerHTML = "";
  tbody5.innerHTML = "";

  for(let i = (coinPage-1)*6; i < (coinPage)*6; i ++) {
    let coin = pdList[i]

    let percent_change_1h = Math.round(coin.quote.KRW.percent_change_1h*10)/10;
    let percent_change_24h = Math.round(coin.quote.KRW.percent_change_24h*10)/10;
    let percent_change_7d = Math.round(coin.quote.KRW.percent_change_7d*10)/10;
    let percent_change_30d = Math.round(coin.quote.KRW.percent_change_30d*10)/10;
    let percent_change_90d = Math.round(coin.quote.KRW.percent_change_90d*10)/10;
    
    let textColor;

    if(percent_change_1h > 0) {
      textColor = 'style="color:red"';
    } else if (percent_change_1h < 0) {
      textColor = 'style="color:blue"';
    } else {
      textColor = 'style="color:grey"'
    }

    tbody1.innerHTML += `
      <tr>
        <td class="text-center w-30 text-truncate">
          ${coin.name}
        </td>
        <td class="text-end w-40">
          ${(Math.round(coin.quote.KRW.price)).toLocaleString('ko-KR')}₩
        </td>
        <td ${textColor} class="text-end">
          ${percent_change_1h}%
        </td>
      </tr>
    `;

    if(percent_change_24h > 0) {
      textColor = 'style="color:red"';
    } else if (percent_change_24h < 0) {
      textColor = 'style="color:blue"';
    } else {
      textColor = 'style="color:grey"'
    }

    tbody2.innerHTML += `
      <tr>
        <td class="text-center w-30 text-truncate">
          ${coin.name}
        </td>
        <td class="text-end w-40">
          ${(Math.round(coin.quote.KRW.price)).toLocaleString('ko-KR')}₩
        </td>
        <td ${textColor} class="text-end w-30">
          ${percent_change_24h}%
        </td>
      </tr>
      `;

      if(percent_change_7d > 0) {
        textColor = 'style="color:red"';
      } else if (percent_change_7d < 0) {
        textColor = 'style="color:blue"';
      } else {
        textColor = 'style="color:grey"'
      }

    tbody3.innerHTML += `
      <tr>
        <td class="text-center w-30 text-truncate">
          ${coin.name}
        </td>
        <td class="text-end w-40">
          ${(Math.round(coin.quote.KRW.price)).toLocaleString('ko-KR')}₩
        </td>
        <td ${textColor} class="text-end">
          ${percent_change_7d}%
        </td>
      </tr>
    `;

    if(percent_change_30d > 0) {
      textColor = 'style="color:red"';
    } else if (percent_change_30d < 0) {
      textColor = 'style="color:blue"';
    } else {
      textColor = 'style="color:grey"'
    }

    tbody4.innerHTML += `
      <tr>
        <td class="text-center w-30 text-truncate">
          ${coin.name}
        </td>
        <td class="text-end w-40">
          ${(Math.round(coin.quote.KRW.price)).toLocaleString('ko-KR')}₩
        </td>
        <td ${textColor} class="text-end">
          ${percent_change_30d}%
        </td>
      </tr>
    `;

    if(percent_change_90d > 0) {
      textColor = 'style="color:red"';
    } else if (percent_change_90d < 0) {
      textColor = 'style="color:blue"';
    } else {
      textColor = 'style="color:grey"'
    }

    tbody5.innerHTML += `
      <tr>
        <td class="text-center w-30 text-truncate">
          ${coin.name}
        </td>
        <td class="text-end w-40">
          ${(Math.round(coin.quote.KRW.price)).toLocaleString('ko-KR')}₩
        </td>
        <td ${textColor} class="text-end">
          ${percent_change_90d}%
        </td>
      </tr>
    `;

  };

}

const coinPagePrev = () => {
  if(coinPage == 1) {
    Swal.fire('첫페이지 입니다.');
    return;
  }
  coinPage--;
  coinListRender();
}

const coinPageNext = () => {
  if(coinPage == 10) {
    Swal.fire('마지막페이지 입니다.');
    return;
  }
  coinPage++;
  coinListRender();
}