import steamImg from '../../../../assets/images/interiors/laura/steam.png';
import styles from './Steam.module.css';

export function Steam() {
  return (
    <>
      <svg className={styles.filterDefs}>
        <defs>
          <filter id="steam-distortion">
            <feTurbulence
              type="turbulence"
              baseFrequency="0.008 0.012"
              numOctaves="3"
              seed="5"
              result="turbulence"
            >
              <animate
                attributeName="baseFrequency"
                values="0.008 0.012;0.015 0.02;0.008 0.012"
                dur="4s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              in="SourceGraphic"
              in2="turbulence"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <img src={steamImg} alt="" className={styles.steam} />
    </>
  );
}
