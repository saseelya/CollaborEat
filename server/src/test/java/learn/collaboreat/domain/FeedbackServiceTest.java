package learn.collaboreat.domain;

import learn.collaboreat.data.FeedbackRepository;
import learn.collaboreat.models.Feedback;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class FeedbackServiceTest {

    @Autowired
    FeedbackService service;

    @MockBean
    FeedbackRepository repository;

    @Test
    void shouldFindById() {
        Feedback feedback = makeFeedback();
        when(repository.findById(1)).thenReturn(feedback);

        Feedback actual = service.findById(1);
        assertEquals(feedback, actual);
    }

    @Test
    void shouldAdd() {
        Feedback feedback = makeFeedback();
        feedback.setFeedbackId(0);
        Feedback mockOut = makeFeedback();

        when(repository.add(feedback)).thenReturn(mockOut);

        Result<Feedback> actual = service.add(feedback);
        assertEquals(ResultType.SUCCESS, actual.getType());
        assertEquals(mockOut, actual.getPayload());
    }

    @Test
    @Disabled
    void shouldNotAddInvalid() {
        Feedback feedback = makeFeedback();

        Result<Feedback> actual = service.add(feedback);
        assertEquals(ResultType.INVALID, actual.getType());

        feedback = null;

        actual = service.add(feedback);
        assertEquals(ResultType.INVALID, actual.getType());
    }

    @Test
    void shouldUpdate() {
        Feedback feedback = makeFeedback();

        when(repository.update(feedback)).thenReturn(true);

        Result<Feedback> actual = service.update(feedback);
        assertEquals(ResultType.SUCCESS, actual.getType());
    }

    @Test
    @Disabled
    void shouldNotUpdateInvalid() {
        Feedback feedback = null;

        Result<Feedback> actual = service.update(feedback);
        assertEquals(ResultType.INVALID, actual.getType());

        feedback = makeFeedback();
        feedback.setFeedbackId(0);

        actual = service.update(feedback);
        assertEquals(ResultType.INVALID, actual.getType());

        feedback.setFeedbackId(100);
        when(repository.update(feedback)).thenReturn(false);

        actual = service.update(feedback);
        assertEquals(ResultType.NOT_FOUND, actual.getType());
    }

    @Test
    void shouldDelete() {
        when(repository.deleteById(1)).thenReturn(true);
        assertTrue(service.deleteById(1));
    }

    @Test
    void shouldNotDelete() {
        when(repository.deleteById(100)).thenReturn(false);
        assertFalse(service.deleteById(100));
    }

    Feedback makeFeedback() {
        Feedback feedback = new Feedback();
        feedback.setFeedbackId(1);
        feedback.setFeedbackComment("This is a test feedback");
        feedback.setFeedbackRating(3);
        feedback.setUserId(1);
        feedback.setRecipeId(1);
        return feedback;
    }
}