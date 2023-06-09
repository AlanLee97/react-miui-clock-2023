import React, { useState, useEffect, useContext } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Mask, NumberSlideSelector, Switch } from "../components";
import { className, appendZero, calcLeftTime } from "../utils";
import { setAlarmData } from "../store/alarmPageReducer";
import "./style.scss";

const pageContext = {
  selectedTime: {
    hour: 0,
    min: 0,
  },
};

const PageContext = React.createContext(pageContext);

function IconBack() {
  return (
    <svg
      t="1682927594234"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="2621"
      width="22"
      height="22"
    >
      <path
        d="M225.834667 225.834667a42.666667 42.666667 0 0 1 60.330666 0L512 451.669333l225.834667-225.834666a42.666667 42.666667 0 1 1 60.330666 60.330666L572.330667 512l225.834666 225.834667a42.666667 42.666667 0 0 1-60.330666 60.330666L512 572.330667l-225.834667 225.834666a42.666667 42.666667 0 0 1-60.330666-60.330666L451.669333 512 225.834667 286.165333a42.666667 42.666667 0 0 1 0-60.330666z"
        fill="#0D0D0D"
        p-id="2622"
      />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      t="1682927660041"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4425"
      width="22"
      height="22"
    >
      <path
        d="M913.017 237.02c-25.311-25.312-66.349-25.312-91.66 0l-412.475 412.474-206.237-206.237c-25.312-25.312-66.35-25.312-91.661 0s-25.312 66.35 0 91.66l252.067 252.067c0.729 0.73 1.439 1.402 2.134 2.029 25.434 23.257 64.913 22.585 89.527-2.029l458.303-458.303c25.313-25.312 25.313-66.35 0.001-91.661z"
        fill="#272636"
        p-id="4426"
      />
    </svg>
  );
}

function IconCloud() {
  return (
    <svg
      t="1682930312942"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="14496"
      width="32"
      height="32"
    >
      <path
        d="M906.752 438.784c-124.928 0-226.304-101.376-226.304-226.304 0-24.576 4.096-48.64 11.264-71.168-102.4 21.504-179.712 112.64-179.712 221.184 0 124.928 101.376 226.304 226.304 226.304 100.352 0 184.832-65.024 214.528-155.136-14.336 3.584-29.696 5.12-46.08 5.12z"
        fill="#EDA915"
        p-id="14497"
      />
      <path
        d="M854.016 664.576c0-94.208-80.896-171.008-180.224-171.008s-180.224 76.288-180.224 171.008v171.008H675.84c98.816-1.024 178.176-77.312 178.176-171.008z"
        fill="#EAEAEA"
        p-id="14498"
      />
      <path
        d="M740.864 656.384c0-54.272-24.576-102.912-62.976-136.192 0.512-5.12 1.024-10.24 1.024-15.36 0-98.816-80.896-179.2-180.224-179.2s-180.224 80.384-180.224 179.2c0 1.536 0 3.584 0.512 5.12-22.528-11.264-48.128-17.408-74.752-17.408-94.72 0-171.52 76.8-171.52 171.52 0 92.672 73.728 167.936 165.888 171.008v0.512H568.32v-0.512c95.744-4.096 172.544-82.432 172.544-178.688z"
        fill="#F7F7F7"
        p-id="14499"
      />
    </svg>
  );
}

function IconCalendar() {
  return (
    <svg
      t="1682930454326"
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="17696"
      width="32"
      height="32"
    >
      <path
        d="M819.2 178.432h-76.8v-36.48c0-21.12-17.28-38.4-38.4-38.4-21.12 0-38.4 17.28-38.4 38.4v36.48H358.4v-36.48c0-21.12-17.28-38.4-38.4-38.4-21.12 0-38.4 17.28-38.4 38.4v36.48H204.8c-53.76 0-96 42.24-96 96v576c0 51.84 42.24 96 96 96h614.4c53.76 0 96-42.24 96-96v-576c0-53.76-42.24-96-96-96z m-460.8 556.8c0 11.52-9.6 21.12-21.12 21.12H300.8c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m0-153.6c0 11.52-9.6 21.12-21.12 21.12H300.8c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m192 153.6c0 11.52-9.6 21.12-21.12 21.12H492.8c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m0-153.6c0 11.52-9.6 21.12-21.12 21.12H492.8c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m192 153.6c0 11.52-9.6 21.12-21.12 21.12h-36.48c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m0-153.6c0 11.52-9.6 21.12-21.12 21.12h-36.48c-11.52 0-19.2-7.68-19.2-19.2v-38.4c0-11.52 7.68-19.2 19.2-19.2h38.4c11.52 0 19.2 7.68 19.2 19.2v36.48z m51.84-128.64H229.76c-21.12 0-38.4-17.28-38.4-38.4 0-21.12 17.28-38.4 38.4-38.4h564.48c21.12 0 38.4 17.28 38.4 38.4 0 21.12-17.28 38.4-38.4 38.4z"
        fill="#faf2e3"
        p-id="17697"
      />
    </svg>
  );
}

function ModuleBox(props = {}) {
  const { children, showSplitLine } = props;
  return (
    <div className="cpn--module-box">
      {children}
      {showSplitLine && <div className="split-line" />}
    </div>
  );
}

function Header(props = {}) {
  const navigate = useNavigate();
  const location = useLocation();
  const pageContext = useContext(PageContext);
  console.log("header pageContext", pageContext);
  const alarmPageStore = useSelector((state) => state.alarmPage);
  const dispatch = useDispatch();
  const editMode = location.state?.mode;
  console.log("alarmPageStore", alarmPageStore);
  const back = () => {
    navigate("/");
  };
  const onDone = () => {
    const list = [...alarmPageStore.alarmData];
    const { hour, min } = pageContext.selectedTime;
    list.push({
      time: {
        hour: appendZero(hour),
        min: appendZero(min),
      },
      triggerMode: "每天",
    });
    dispatch(setAlarmData(list));
    console.log("alarmPageStore", alarmPageStore);
    back();
  };

  const getLeftHour = () => {
    if (pageContext.selectedTime?.hour) {
      return calcLeftTime(pageContext.selectedTime?.hour, 24);
    } else {
      return 0;
    }
  };
  const getLeftMin = () => {
    if (pageContext.selectedTime?.min) {
      return calcLeftTime(pageContext.selectedTime?.min, 60);
    } else { 
      return 0;
    }
  };

  useEffect(() => {
    const boxList = Array.from(
      document.querySelectorAll(".select-box-wrapper")
    );
    boxList.forEach((item) => {
      const { width } = item.getBoundingClientRect();
      item.style.height = `${width}px`;
    });
  });

  return (
    <div className="cpn--header">
      <div className="header-row">
        <div className="left" onClick={back}>
          <IconBack />
        </div>
        <div className="center">
          <div className="header-title">
            {editMode ? "编辑" : "添加"}
            闹钟
          </div>
          <div>{getLeftHour()}小时{getLeftMin()}分钟后响铃</div>
        </div>
        <div className="right" onClick={onDone}>
          <IconCheck />
        </div>
      </div>
    </div>
  );
}

function TimerSelector(props = {}) {
  const { onSelected = () => {} } = props;
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);
  useEffect(() => {
    onSelected({
      hour: h,
      min: m,
    });
  }, [h, m]);
  return (
    <div className="cpn--timer-selector">
      <NumberSlideSelector start={0} end={23} unit="时" onSelected={setH} />
      <div className="divider" />
      <NumberSlideSelector start={0} end={59} unit="分" onSelected={setM} />
    </div>
  );
}

function RingtoneSelector(props = {}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onClick = (i) => {
    setActiveIndex(i);
  };
  const setClassName = (name) => className(name);
  return (
    <div className="cpn--ringtone-selector">
      <div className="small-title">选择铃声</div>
      <div className="ringtone-selector">
        <div
          onClick={() => onClick(0)}
          className={setClassName([
            "select-box-wrapper",
            activeIndex === 0 ? "select-box-wrapper-active" : "",
          ])}
        >
          <div className="select-box weather-box">
            <div className="icon-wrapper">
              <IconCloud />
            </div>
            <div className="box-bottom">天气动态铃声</div>
          </div>
        </div>
        <div
          onClick={() => onClick(1)}
          className={setClassName([
            "select-box-wrapper",
            activeIndex === 1 ? "select-box-wrapper-active" : "",
          ])}
        >
          <div className="select-box el-box">
            <div className="icon-wrapper">
              <IconCalendar />
            </div>
            <div className="box-bottom">元素动态铃声</div>
          </div>
        </div>
        <div
          onClick={() => onClick(2)}
          className={setClassName([
            "select-box-wrapper",
            activeIndex === 2 ? "select-box-wrapper-active" : "",
          ])}
        >
          <div className="select-box more-box">
            <div className="icon-wrapper">
              <svg
                t="1682930575739"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="19068"
                width="32"
                height="32"
              >
                <path
                  d="M130.264557 870.035707a122.453333 160 68.891 1 0 298.527032-115.245873 122.453333 160 68.891 1 0-298.527032 115.245873Z"
                  fill="#ffffff"
                  opacity=".99"
                  p-id="19069"
                />
                <path
                  d="M591.0825 774.046673a122.453333 160 68.891 1 0 298.527032-115.245872 122.453333 160 68.891 1 0-298.527032 115.245872Z"
                  fill="#ffffff"
                  opacity=".99"
                  p-id="19070"
                />
                <path
                  d="M783.786667 98.56l-355.413334 113.066667A86.4 86.4 0 0 0 366.933333 294.4v495.786667h68.266667V388.266667c0-8.106667 5.12-15.36 13.226667-17.493334l355.84-113.493333c1.706667-0.426667 3.413333-0.853333 5.12-0.853333 8.96 0 18.346667 7.253333 18.346666 18.346666v418.133334h68.266667v-512c0-58.026667-56.32-99.413333-112.213333-82.346667z"
                  fill="#ffffff"
                  opacity=".99"
                  p-id="19071"
                />
              </svg>
            </div>
            <div className="box-bottom">
              <div>更多铃声</div>
              <div className="small-icon-wrapper">
                <svg
                  t="1682930678863"
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="26058"
                  width="12"
                  height="16"
                >
                  <path
                    d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                    fill="#ffffff"
                    p-id="26059"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="split-line" />
    </div>
  );
}

function OtherSetting(props = {}) {
  const { onNoteChange = () => {} } = props;
  const [showMask, setShowMask] = useState(false);
  const [showReapetMask, setShowReapetMask] = useState(false);
  const [note, setNote] = useState('');
  const [noteTemp, setNoteTemp] = useState('');
  const [curRepeat, setCurRepeat] = useState(1);
  const toShowMask = () => {
    setShowMask(true);
  };

  const stop = (e) => {
    e.stopPropagation();
  };

  const closeMask = () => {
    setShowMask(false);
  };

  const onInputChange = (e) => {
    setNoteTemp(e.target.value);
  };

  const onConfirm = () => {
    setNote(noteTemp);
    onNoteChange(note);
    closeMask();
  };

  const onConfirmRepeat = (index) => {
    setCurRepeat(index);
    setShowReapetMask(false);
  };

  const repeatOptopns = [
    '只响一次',
    '每天',
    '法定工作日',
    '法定节假日',
    '周一至周五',
    '自定义',
  ];

  return (
    <div className="cpn--other-setting">
      <Mask show={showMask} setVisible={setShowMask} closeOnMask>
        <div className="new-alarm-note-wrapper">
          <div className="new-alarm-note-content" onClick={stop}>
            <div className="title">新建闹钟备注</div>
            <div className="input-box">
              <input type="text" placeholder="请输入闹钟备注" onChange={onInputChange} />
            </div>
            <div className="btn-row">
              <button onClick={closeMask}>取消</button>
              <button className="ml-1 primary-btn" onClick={onConfirm}>确定</button>
            </div>
          </div>
        </div>
      </Mask>

      <Mask show={showReapetMask} setVisible={setShowReapetMask} closeOnMask>
        <div className="repeat-time-wrapper">
          <div className="repeat-time-content" onClick={stop}>
            {
              repeatOptopns.map((item, index) => {
                return (
                  <div key={index} 
                    className={['repeat-time-item', index === curRepeat ? 'repeat-time-item-active' : ''].join(' ').trim()} 
                    onClick={() => onConfirmRepeat(index)}>{item}</div>
                );
              })
            }
          </div>
        </div>
      </Mask>

      <div className="small-title">其他设置</div>
      <div className="setting-item-wrapper">
        <div className="setting-item" onClick={() => setShowReapetMask(true)}>
          <div className="setting-item-title">重复</div>
          <div className="setting-item-content">
            {repeatOptopns[curRepeat]}
            <div className="icon-wrapper">
              <svg
                t="1682930678863"
                className="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="26058"
                width="18"
                height="24"
              >
                <path
                  d="M731.733333 480l-384-341.333333c-17.066667-14.933333-44.8-14.933333-59.733333 4.266666-14.933333 17.066667-14.933333 44.8 4.266667 59.733334L640 512 292.266667 821.333333c-17.066667 14.933333-19.2 42.666667-4.266667 59.733334 8.533333 8.533333 19.2 14.933333 32 14.933333 10.666667 0 19.2-4.266667 27.733333-10.666667l384-341.333333c8.533333-8.533333 14.933333-19.2 14.933334-32s-4.266667-23.466667-14.933334-32z"
                  fill="#00000066"
                  p-id="26059"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-item-title">删除后响铃</div>
          <div className="setting-item-content">
            <Switch />
          </div>
        </div>
        <div className="setting-item">
          <div className="setting-item-title">响铃后删除此闹钟</div>
          <div className="setting-item-content">
            <Switch />
          </div>
        </div>
        <div className="setting-item fake-input-box" onClick={toShowMask}>
          <div className="setting-item-title">备注</div>
          <div className="setting-item-content">{note || '请输入'}</div>
        </div>
      </div>
    </div>
  );
}

class AddAlarmPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: {
        hour: 0,
        min: 0,
      },
      note: ''
    };
  }

  componentDidMount() {}

  onTimeSelected = (val) => {
    console.log("onTimeSelected val", val);
    this.setState({
      selectedTime: val,
    });
  };

  onNoteChange = val => {
    console.log('onNoteChange', val);
    this.setState({
      note: val
    });
  };

  render() {
    const { alarmData, restData } = this.state;
    return (
      <PageContext.Provider value={this.state}>
        <div className="page-wrapper">
          <div className="page--add-alarm">
            <div className="fixed-module">
              <Header />

              <ModuleBox>
                <TimerSelector onSelected={this.onTimeSelected} />
              </ModuleBox>
            </div>

            <div className="scroll-module">
              <ModuleBox>
                <RingtoneSelector />
              </ModuleBox>

              <ModuleBox>
                <OtherSetting onNoteChange={this.onNoteChange} />
              </ModuleBox>
            </div>
          </div>
        </div>
      </PageContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    setAlarmData: (val) => dispatch(setAlarmData(val)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddAlarmPage);
