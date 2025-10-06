import { useAchievement } from 'hooks/useAchievement';
import {
  BackgroundImage,
  CircleProgress,
  CircularProgress,
  ContentWrapper,
  DateText,
  PercentageText,
  SectionContainer,
  SVGWrapper,
  WrapDatePercentage,
} from './index.styles';

const AchievementSection = () => {
  const { data, isLoading, isError } = useAchievement();

  if (isLoading) {
    return (
      <SectionContainer>
        <ContentWrapper>
          <div>Loading...</div>
        </ContentWrapper>
      </SectionContainer>
    );
  }

  if (isError || !data?.data) {
    return (
      <SectionContainer>
        <ContentWrapper>
          <div>データの取得に失敗しました</div>
        </ContentWrapper>
      </SectionContainer>
    );
  }

  const { date, imageUrl, achievementRate } = data.data;
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
  });

  return (
    <SectionContainer>
      <BackgroundImage $imageUrl={imageUrl} />
      <ContentWrapper>
        <CircularProgress>
          <SVGWrapper viewBox="0 0 180 180">
            <CircleProgress
              cx="90"
              cy="90"
              r="80"
              $percentage={achievementRate}
            />
          </SVGWrapper>
          <WrapDatePercentage>
            <DateText>{formattedDate}</DateText>
            <PercentageText>{achievementRate}%</PercentageText>
          </WrapDatePercentage>
        </CircularProgress>
      </ContentWrapper>
    </SectionContainer>
  );
};

export default AchievementSection;
