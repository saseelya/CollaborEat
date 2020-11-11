package learn.collaboreat.data;

import learn.collaboreat.models.Feedback;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FeedbackJDBCTemplateRepositoryTest {

    private final int NEXT_ID = 3;

    @Autowired
    FeedbackJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldFindAll() {
        List<Feedback> feedbacks = repository.findAll();

        assertNotNull(feedbacks);
        assertEquals(2, feedbacks.size());
    }

    @Test
    void shouldFindById() {
        Feedback feedback = repository.findById(1);

        assertNotNull(feedback);
        assertEquals(1, feedback.getFeedbackRating());
    }

    @Test
    void shouldNotFindMissingId() {
        Feedback feedback = repository.findById(-10000);

        assertNull(feedback);
    }

    @Test
    void shouldAdd() {
        Feedback feedback = makeFeedback();

        feedback = repository.add(feedback);
        assertEquals(NEXT_ID, feedback.getFeedbackId());
    }

    @Test
    void shouldUpdate() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackId(1);

        assertTrue(repository.update(feedback));
        assertEquals(3, repository.findById(1).getFeedbackRating());
    }

    @Test
    void shouldNotUpdate() {
        Feedback feedback = makeFeedback();

        assertFalse(repository.update(feedback));
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteById(1));
        assertEquals(1, repository.findAll().size());
    }

    @Test
    void shouldNotDelete() {
        assertFalse(repository.deleteById(-10));
    }

    Feedback makeFeedback() {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(0);
        feedback.setFeedbackComment("This is a test feedback");
        feedback.setFeedbackRating(3);
        feedback.setUserId(1);
        feedback.setRecipeId(1);
        return feedback;
    }

}