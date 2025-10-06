import timerIcon from 'assets/icons/ic-timer.svg';
import {
  Card,
  DateText,
  MealIcon,
  MealImage,
  MealType,
  OverlayBar,
} from './MealCard.styles';

interface MealCardProps {
  id: string;
  createdAt: string;
  type: string;
  imageUrl: string;
  altText: string;
}

const MealCard = ({ createdAt, type, imageUrl, altText }: MealCardProps) => {
  const formattedDate = new Date(createdAt)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '.');

  return (
    <Card
      tabIndex={0}
      role="article"
      aria-label={`${type} meal on ${formattedDate}`}
    >
      <MealImage src={imageUrl} alt={altText} loading="lazy" />
      <OverlayBar>
        <DateText>{formattedDate}</DateText>
        <MealIcon src={timerIcon} alt="" />
        <MealType>{type}</MealType>
      </OverlayBar>
    </Card>
  );
};

export default MealCard;
