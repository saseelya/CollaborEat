package learn.collaboreat.data;

import learn.collaboreat.models.Feedback;

import java.util.List;

public interface FeedbackRepository {

    List<Feedback> findAll();

    Feedback findById(int feedbackId);

    Feedback add(Feedback feedback);

    boolean update(Feedback feedback);

    boolean deleteById(int feedbackId);
}
