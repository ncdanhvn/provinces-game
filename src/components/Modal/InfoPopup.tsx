import infoIcon from "../../assets/info.svg";
import link from "../../assets/link.svg";

interface Props {
    classes: string[]
}

const InfoPopup = ({classes}: Props) => {
    return (
        <div className={`info-popup ${classes.join(' ')}`}>
            <div className="info-popup__title">
                Thông Tin{" "}
                <img className="info-icon" src={infoIcon} alt="Info Icon" />
            </div>
            <ul>
                <li>
                    <p>
                        Game dựa trên bản đồ phần đất liền của Việt Nam, chưa kể
                        đến các hải đảo thuộc chủ quyền Việt Nam như{" "}
                        <span className="highlight">
                            Hoàng Sa, Trường Sa ...
                        </span>
                    </p>
                </li>
                <li>
                    <p>
                        <span className="highlight">Tác giả: </span>Danh Nguyễn
                        - ncdanhvn@gmail.com
                    </p>
                </li>
                <li>
                    <p>
                        Github Repository{" "}
                        <a
                            href="http://github.com/ncdanhvn/provinces-game"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="link-icon"
                                src={link}
                                alt="Info Icon"
                            />
                        </a>
                    </p>
                </li>
                <li>
                    <p>
                        Xin cám ơn logo Bánh Mỳ của Flaticon{" "}
                        <a
                            href="https://www.flaticon.com/free-icons/bread"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                className="link-icon"
                                src={link}
                                alt="Bread Icon"
                            />
                        </a>
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default InfoPopup;
