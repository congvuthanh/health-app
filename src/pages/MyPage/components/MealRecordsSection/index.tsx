import memoIcon from 'assets/icons/ic-memo.svg';
import { LIMIT_MEAL_RECORDS } from 'constants/myPage';
import { useMealRecordsInfinite } from 'hooks/useMealRecords';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import MealCard from './components/MealCard';
import {
  EmptyState,
  ErrorContainer,
  HeaderIcon,
  HeaderText,
  LoadingMoreContainer,
  MealGrid,
  RetryButton,
  SectionContainer,
  SectionHeader,
  Sentinel,
  SkeletonCard,
} from './index.styles';

const MealRecordsSection = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMealRecordsInfinite({ limit: LIMIT_MEAL_RECORDS });

  const { ref: sentinelRef, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <SectionContainer>
        <SectionHeader>
          <HeaderIcon src={memoIcon} alt="" />
          <HeaderText>食事の記録</HeaderText>
        </SectionHeader>
        <MealGrid>
          {Array.from({ length: LIMIT_MEAL_RECORDS }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </MealGrid>
      </SectionContainer>
    );
  }

  if (isError) {
    return (
      <SectionContainer>
        <SectionHeader>
          <HeaderIcon src={memoIcon} alt="" />
          <HeaderText>食事の記録</HeaderText>
        </SectionHeader>
        <ErrorContainer>
          <div>食事記録の取得に失敗しました</div>
          <RetryButton onClick={() => refetch()}>再試行</RetryButton>
        </ErrorContainer>
      </SectionContainer>
    );
  }

  const allMeals = data?.pages.flatMap((page) => page.data.items) ?? [];

  if (allMeals.length === 0) {
    return (
      <SectionContainer>
        <SectionHeader>
          <HeaderIcon src={memoIcon} alt="" />
          <HeaderText>食事の記録</HeaderText>
        </SectionHeader>
        <EmptyState>食事の記録がありません</EmptyState>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer>
      <SectionHeader>
        <HeaderIcon src={memoIcon} alt="" />
        <HeaderText>食事の記録</HeaderText>
      </SectionHeader>
      <MealGrid>
        {allMeals.map((meal) => (
          <MealCard
            key={meal.id}
            id={meal.id}
            createdAt={meal.createdAt}
            type={meal.type}
            imageUrl={meal.imageUrl}
            altText={meal.altText}
          />
        ))}
      </MealGrid>
      {hasNextPage && <Sentinel ref={sentinelRef} />}
      {isFetchingNextPage && (
        <LoadingMoreContainer>読み込み中...</LoadingMoreContainer>
      )}
    </SectionContainer>
  );
};

export default MealRecordsSection;
