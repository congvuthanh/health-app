import { useAuth } from 'contexts/AuthContext';
import { Navigate } from 'react-router';
import AchievementSection from './components/AchievementSection';
import HealthRecordSection from './components/HealthRecordSection';
import MealRecordsSection from './components/MealRecordsSection';
import {
  ContentWrapper,
  PageContainer,
  TopSectionWrapper,
} from './index.styles';

function MyPage() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/authenticationError" replace />;
  }

  return (
    <PageContainer>
      <TopSectionWrapper>
        <AchievementSection />
        <HealthRecordSection />
      </TopSectionWrapper>
      <ContentWrapper>
        <MealRecordsSection />
      </ContentWrapper>
    </PageContainer>
  );
}

export default MyPage;
